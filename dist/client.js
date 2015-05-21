'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _utilsGetLoaders = require('./utils/getLoaders');

var _utilsGetLoaders2 = _interopRequireDefault(_utilsGetLoaders);

var _utilsGetPlugins = require('./utils/getPlugins');

var _utilsGetPlugins2 = _interopRequireDefault(_utilsGetPlugins);

var _utilsGetOutput = require('./utils/getOutput');

var _utilsGetOutput2 = _interopRequireDefault(_utilsGetOutput);

var _utilsGetEntries = require('./utils/getEntries');

/**
 * @param host
 * @returns {string[]}
 */
function getHotloaderPlugins(host) {
  return ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server'];
}

var Client = (function () {
  function Client(isProd) {
    _classCallCheck(this, Client);

    this.isProd = isProd;

    this.getLoaders = _utilsGetLoaders2['default'];
    this.getPlugins = _utilsGetPlugins2['default'];
    this.getOutput = _utilsGetOutput2['default'];
  }

  _createClass(Client, [{
    key: 'create',

    // Options:
    // * isProd: whether we're in production mode
    // * entry:  file, directory or array of entry points
    /**
     * @param {bool} isProd
     * @param options {{
     *   entry:  string|[],
     *   output: {
     *     path:          string
     *     publicPath:    string
     *     filename:      string
     *     chunkFilename: string
     *   },
     *   [plugins]: [],
     *   [debug]:  bool,
     *   [externals]: {},
     *   [postcss]: {}
     * }}
     *
     * @returns {{
     *  entry:  string|[],
     *  debug:  bool,
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
    value: function create(options) {
      (0, _assert2['default'])(options, 'options may not be omitted');
      (0, _assert2['default'])(options.entry, 'options.entry may not be omitted');
      (0, _assert2['default'])(options.output, 'options.output may not be omitted');

      return _extends({
        // Replaced values
        entry: [],
        output: {},

        debug: !this.isProd,
        devtool: this.isProd ? 'sourcemap' : 'eval',

        resolve: {
          extensions: ['', '.js', '.jsx', '.json']
        },

        postcss: {
          defaults: [_autoprefixerCore2['default']]
        }
      }, options);
    }
  }, {
    key: 'getEntries',

    /**
     * @param host
     * @param appDir
     * @param ext
     * @param key
     */
    value: function getEntries(host, appDir, ext, key) {
      var entries = (0, _utilsGetEntries.getEntries)(appDir, ext, key);

      // In development mode an additional `dev` entry point is injected
      // (includes hot code loading and development server code)
      if (host) {
        entries.dev = getHotloaderPlugins(host);
      }

      return entries;
    }
  }, {
    key: 'getNestedEntries',

    /**
     * @param host
     * @param appDir
     * @param entry
     * @returns {{}}
     */
    value: function getNestedEntries(host, appDir, entry) {
      var entries = (0, _utilsGetEntries.getNestedEntries)(appDir, entry);

      if (host) {
        entries.dev = getHotloaderPlugins(host);
      }

      return entries;
    }
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];