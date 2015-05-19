'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// Return a Webpack config

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _utilsGetLoaders = require('./utils/getLoaders');

var _utilsGetLoaders2 = _interopRequireDefault(_utilsGetLoaders);

var _utilsGetPlugins = require('./utils/getPlugins');

var _utilsGetPlugins2 = _interopRequireDefault(_utilsGetPlugins);

var _utilsUpdateOutput = require('./utils/updateOutput');

var _utilsUpdateOutput2 = _interopRequireDefault(_utilsUpdateOutput);

// Exported utils

var _utilsGetEntries = require('./utils/getEntries');

var _utilsGetServerOpts = require('./utils/getServerOpts');

var _utilsGetServerOpts2 = _interopRequireDefault(_utilsGetServerOpts);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

// Export
//-----------------------------------------------
// Options:
// * entry:     file, directory or array of entry points
//
// * jsUrl: path to JS files relative to webRoot
// * srcs:  absolute paths to jsx, scss, etc
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

var WebPacker = function WebPacker(options, jsUrl, cssUrl, sassPath) {
  _classCallCheck(this, WebPacker);

  (0, _assert2['default'])(options, 'options may not be omitted');
  (0, _assert2['default'])(options.entry, 'options.entry may not be omitted');
  (0, _assert2['default'])(options.output, 'options.output may not be omitted');

  // Fill any missing optional values for `output` with defaults
  options.output = (0, _utilsUpdateOutput2['default'])(options.output, jsUrl);

  this.options = _extends({
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

  return this.options;
};

exports['default'] = WebPacker;
exports.getEntries = _utilsGetEntries.getEntries;
exports.getEntriesMulti = _utilsGetEntries.getEntriesMulti;
exports.getServerOpts = _utilsGetServerOpts2['default'];