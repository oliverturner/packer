// Return a Webpack config

import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import extractEntries from './utils/extractEntries';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

let defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders (paths) {
  let loaders, sassLoaders;

  sassLoaders = ['style', 'css', 'postcss', 'sass?includePaths[]=' + paths.sass];

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
        loader: ExtractTextPlugin.extract(sassLoaders)
      },
      jsx:  {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).reduce((ret, key) => {
    ret.push(loaders[key]);

    return ret;
  }, []);
}

function getPlugins (paths) {
  let defaults, development, production;

  defaults = [
    new webpack.optimize.CommonsChunkPlugin(`${paths.js}/common.js`),
    new webpack.DefinePlugin(defs),
    new webpack.NoErrorsPlugin()
  ];

  development = [
    new webpack.HotModuleReplacementPlugin()
  ];

  production = [
    new webpack.optimize.UglifyJsPlugin({
      output:   {comments: false},
      compress: {warnings: false}
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.css')
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
 *     publicPath: string
 *     path:       string
 *     filename:   string
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
  return Object.assign({
    module: {
      loaders: getLoaders(files.paths)
    },

    plugins: getPlugins(files.paths),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [autoprefixer]
    }
  }, options);
}

export default WebPacker;

export { extractEntries };
