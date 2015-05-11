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

var _utilsPackEntries = require('./utils/packEntries');

var _utilsPackEntries2 = _interopRequireDefault(_utilsPackEntries);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getExtractLoader(ret, loader) {
  var parts = undefined,
      module = undefined,
      suffix = undefined;

  parts = loader.split('?');
  module = parts[0];
  suffix = parts[1] || '';

  switch (loader) {
    case 'style':
      break;

    default:
      ret.push(module + '-loader?' + suffix);
      break;
  }
  return ret;
}

function getLoaders(paths) {
  var loaders = undefined,
      sassLoaders = undefined,
      extractLoaders = undefined;

  sassLoaders = ['style', 'css', 'postcss', 'sass?includePaths[]=' + paths.sass];
  extractLoaders = sassLoaders.reduce(getExtractLoader, []).join('!');

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
        loader: _extractTextWebpackPlugin2['default'].extract(extractLoaders)
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

function getPlugins(urls) {
  var defaults = undefined,
      development = undefined,
      production = undefined;

  defaults = [new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin()];

  development = [new _webpack2['default'].optimize.CommonsChunkPlugin('commons', '' + urls.js + '/commons.js'), new _webpack2['default'].HotModuleReplacementPlugin()];

  production = [new _extractTextWebpackPlugin2['default']('' + urls.css + '/[name].css', {
    allChunks: true
  }), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.DedupePlugin(), new _webpack2['default'].optimize.UglifyJsPlugin({
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
  var defaultOutputs = {
    path: null,
    publicPath: '/' + files.urls.js + '/',
    filename: files.urls.js + '/[name].js',
    chunkFilename: files.urls.js + '/[id].js'
  };

  // Fill any required values for `output` with defaults if omitted
  options.output = Object.keys(defaultOutputs).reduce(function (output, key) {
    output[key] = output[key] || defaultOutputs[key];

    if (output[key] === null) {
      throw new Error('output.' + key + ' may not be omitted');
    }

    return output;
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
exports.packEntries = _utilsPackEntries2['default'];