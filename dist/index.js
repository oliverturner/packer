// Return a Webpack config
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _utilsGetLoaders = require('./utils/getLoaders');

var _utilsGetLoaders2 = _interopRequireDefault(_utilsGetLoaders);

var _utilsGetPlugins = require('./utils/getPlugins');

var _utilsGetPlugins2 = _interopRequireDefault(_utilsGetPlugins);

// Exported utils

var _utilsGetEntries = require('./utils/getEntries');

var _utilsGetEntries2 = _interopRequireDefault(_utilsGetEntries);

var _utilsGetServerOpts = require('./utils/getServerOpts');

var _utilsGetServerOpts2 = _interopRequireDefault(_utilsGetServerOpts);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

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
 * @param {string} jsUrl
 * @param {string} cssUrl
 * @param {string} sassPath
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
function WebPacker(options, jsUrl, cssUrl, sassPath) {
  var defaultOutputs = {
    path: null,
    publicPath: '/' + jsUrl + '/',
    filename: jsUrl + '/[name].js',
    chunkFilename: jsUrl + '/[name].js'
  };

  if (!options) {
    throw new Error('options may not be omitted');
  }

  if (!options.output) {
    throw new Error('options.output may not be omitted');
  }

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
      loaders: (0, _utilsGetLoaders2['default'])(isProd, sassPath)
    },

    plugins: (0, _utilsGetPlugins2['default'])(isProd, jsUrl, cssUrl),

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
exports.getServerOpts = _utilsGetServerOpts2['default'];