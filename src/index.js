// Return a Webpack config

import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import packEntries from './utils/packEntries';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

let defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders (paths) {
  let loaders, sassLoaders, extractLoaders;

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
        loader: ExtractTextPlugin.extract(loaders.sass)
        //loader: ExtractTextPlugin.extract(sassLoaders)
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader?includePaths[]=' + paths.sass)
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

function getPlugins (urls) {
  let defaults, development, production;

  defaults = [
    //new webpack.optimize.CommonsChunkPlugin('common', `${urls.js}/common.js`),
    //new webpack.DefinePlugin(defs),
    //new webpack.NoErrorsPlugin()
  ];

  development = [
    new webpack.HotModuleReplacementPlugin()
  ];

  production = [
    new ExtractTextPlugin(`${urls.css}/styles.css`, { allChunks: true }),
    //new webpack.optimize.CommonsChunkPlugin('common', `${urls.js}/common.js`),

    //new webpack.optimize.UglifyJsPlugin({
    //  output:   {comments: false},
    //  compress: {warnings: false}
    //}),
    //new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.optimize.DedupePlugin()
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

export { packEntries };
