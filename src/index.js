// Return a Webpack config

import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getEntries from './utils/getEntries';
import getServerOpts from './utils/getServerOpts';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

let defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getPostLoader (loader) {
  let parts, module, suffix, splitter;

  parts    = loader.split('?');
  module   = parts[0];
  suffix   = parts[1] || '';
  splitter = suffix.length ? '?' : '';

  return `${module}-loader${splitter}${suffix}`;
}

// Return an array of loaders for the various file types
// In production we remove the ReactHotLoader and Sass plugins
/**
 * @param paths {{
 *   sass: string
 * }}
 * @returns {Array}
 */
function getLoaders (paths) {
  let loaders, postLoaders, sassLoaders, extractLoaders;

  postLoaders    = ['css', 'postcss', '@oliverturner/sass?includePaths[]=' + paths.sass];
  sassLoaders    = ['style'].concat(postLoaders);
  extractLoaders = postLoaders.map(getPostLoader).join('!');

  loaders = {
    json:   {
      test:    /\.json$/,
      loaders: ['json']
    },
    expose: {
      test:   require.resolve('react'),
      loader: 'expose?React'
    },
    sass:   {
      test:    /\.scss$/,
      loaders: sassLoaders
    },
    jsx:    {
      test:    /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  };

  // Production overrides
  if (isProd) {
    loaders = Object.assign(loaders, {
      sass: {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', extractLoaders)
      },
      jsx:  {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).map(key => loaders[key]);
}

function getPlugins (urls) {
  let defaults, development, production, commonsChunk;

  commonsChunk = new webpack.optimize.CommonsChunkPlugin('commons', `${urls.js}/commons.js`);

  defaults = [
    new webpack.DefinePlugin(defs),
    new webpack.NoErrorsPlugin()
  ];

  development = [
    commonsChunk,
    new webpack.HotModuleReplacementPlugin()
  ];

  production = [
    commonsChunk,
    new ExtractTextPlugin(`${urls.css}/[name].css`, {
      allChunks: true
    }),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output:   {comments: false},
      compress: {warnings: false}
    })
  ];

  return (isProd)
    ? defaults.concat(production)
    : defaults.concat(development);
}

// Export
//-----------------------------------------------
// Options:
// * entry:     file, directory or array of entry points
//
// Files:
// * srcs:  absolute paths to jsx, scss, etc
// * paths: absolute paths to destination dirs
// * urls:  paths to assets relative to webRoot
/**
 * @param options {{
 *   entry:  string|[]
 *   output: {
 *     path:          string
 *     publicPath:    string
 *     filename:      string
 *     chunkFilename: string
 *   }
 * }}
 * @param files {{
 *   srcs:  {},
 *   paths: {},
 *   urls:  {}
 * }}
 *
 * @returns {{
 *  entry:  string|[]
 *  output: {
 *     publicPath: string
 *     path:       string
 *     filename:   string
 *   },
 *   module: {
 *     loaders: []
 *   },
 *   plugins: [],
 *   resolve: {},
 *   postcss: {}
 * }}
 */
function WebPacker (options, files) {
  let defaultOutputs = {
    path:          null,
    publicPath:    '/' + files.urls.js + '/',
    filename:      files.urls.js + '/[name].js',
    chunkFilename: files.urls.js + '/[name].js'
  };

  // Fill any required values for `output` with defaults if omitted
  options.output = Object.keys(defaultOutputs).reduce((outputs, key) => {
    outputs[key] = outputs[key] || defaultOutputs[key];

    if (outputs[key] === null) {
      throw new Error(`output.${key} may not be omitted`);
    }

    return outputs;
  }, options.output);

  return Object.assign({
    module: {
      loaders: getLoaders(files.srcs)
    },

    plugins: getPlugins(files.urls),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [autoprefixer]
    }
  }, options);
}

export default WebPacker;

export { getEntries, getServerOpts };
