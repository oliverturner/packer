'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Return a Webpack config

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _utilsExtractEntries = require('./utils/extractEntries');

var _utilsExtractEntries2 = _interopRequireDefault(_utilsExtractEntries);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders(paths) {
  var loaders = undefined,
      sassLoaders = undefined;

  sassLoaders = ['style', 'css', 'postcss', 'sass?includePaths[]=' + paths.sass];

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
        loader: _extractTextWebpackPlugin2['default'].extract(sassLoaders)
      },
      jsx: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).reduce(function (ret, key) {
    ret.push(loaders[key]);

    return ret;
  }, []);
}

function getPlugins(paths) {
  var defaults = undefined,
      development = undefined,
      production = undefined;

  defaults = [new _webpack2['default'].optimize.CommonsChunkPlugin('' + paths.js + '/common.js'), new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin()];

  development = [new _webpack2['default'].HotModuleReplacementPlugin()];

  production = [new _webpack2['default'].optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  }), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.DedupePlugin(), new _extractTextWebpackPlugin2['default']('styles.css')];

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
function WebPacker(options, files) {
  return _extends({
    module: {
      loaders: getLoaders(files.paths)
    },

    plugins: getPlugins(files.paths),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [_autoprefixerCore2['default']]
    }
  }, options);
}

exports['default'] = WebPacker;
exports.extractEntries = _utilsExtractEntries2['default'];