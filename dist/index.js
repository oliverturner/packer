// Return a Webpack config

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _utilsGetEntries = require('./utils/getEntries');

var _utilsGetEntries2 = _interopRequireDefault(_utilsGetEntries);

var _utilsGetDevServer = require('./utils/getDevServer');

var _utilsGetDevServer2 = _interopRequireDefault(_utilsGetDevServer);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getPostLoader(loader) {
  var parts = undefined,
      module = undefined,
      suffix = undefined,
      splitter = undefined;

  parts = loader.split('?');
  module = parts[0];
  suffix = parts[1] || '';
  splitter = suffix.length ? '?' : '';

  return '' + module + '-loader' + splitter + '' + suffix;
}

// Return an array of loaders for the various file types
// In production we remove the ReactHotLoader and Sass plugins
/**
 * @param paths {{
 *   sass: string
 * }}
 * @returns {Array}
 */
function getLoaders(paths) {
  var loaders = undefined,
      postLoaders = undefined,
      sassLoaders = undefined,
      extractLoaders = undefined;

  postLoaders = ['css', 'postcss', '@oliverturner/sass?includePaths[]=' + paths.sass];
  sassLoaders = ['style'].concat(postLoaders);
  extractLoaders = postLoaders.map(getPostLoader).join('!');

  loaders = {
    json: {
      test: /\.json$/,
      loaders: ['json']
    },
    expose: {
      test: require.resolve('react'),
      loader: 'expose?React'
    },
    sass: {
      test: /\.scss$/,
      loaders: sassLoaders
    },
    jsx: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  };

  // Production overrides
  if (isProd) {
    loaders = _extends(loaders, {
      sass: {
        test: /\.scss$/,
        loader: _extractTextWebpackPlugin2['default'].extract('style-loader', extractLoaders)
      },
      jsx: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).map(function (key) {
    return loaders[key];
  });
}

function getPlugins(urls) {
  var defaults = undefined,
      development = undefined,
      production = undefined,
      commonsChunk = undefined;

  commonsChunk = new _webpack2['default'].optimize.CommonsChunkPlugin('commons', '' + urls.js + '/commons.js');

  defaults = [new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin()];

  development = [commonsChunk, new _webpack2['default'].HotModuleReplacementPlugin()];

  production = [commonsChunk, new _extractTextWebpackPlugin2['default']('' + urls.css + '/[name].css', {
    allChunks: true
  }),
  //new webpack.optimize.OccurenceOrderPlugin(),
  //new webpack.optimize.DedupePlugin(),
  new _webpack2['default'].optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  })];

  return isProd ? defaults.concat(production) : defaults.concat(development);
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
function WebPacker(options, files) {
  var defaultOutputs = {
    path: null,
    publicPath: '/' + files.urls.js + '/',
    filename: files.urls.js + '/[name].js',
    chunkFilename: files.urls.js + '/[name].js'
  };

  // Fill any required values for `output` with defaults if omitted
  options.output = Object.keys(defaultOutputs).reduce(function (outputs, key) {
    outputs[key] = outputs[key] || defaultOutputs[key];

    if (outputs[key] === null) {
      throw new Error('output.' + key + ' may not be omitted');
    }

    return outputs;
  }, options.output);

  return _extends({
    module: {
      loaders: getLoaders(files.paths)
    },

    plugins: getPlugins(files.urls),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [_autoprefixerCore2['default']]
    }
  }, options);
}

exports['default'] = WebPacker;
exports.getEntries = _utilsGetEntries2['default'];
exports.getDevServer = _utilsGetDevServer2['default'];