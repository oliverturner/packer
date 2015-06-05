'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _immutable = require('immutable');

var _utilsValidateOpts = require('../utils/validateOpts');

var _utilsValidateOpts2 = _interopRequireDefault(_utilsValidateOpts);

var _utilsGetOutput = require('../utils/getOutput');

var _utilsGetOutput2 = _interopRequireDefault(_utilsGetOutput);

var _utilsGetLoaders = require('../utils/getLoaders');

var _utilsGetLoaders2 = _interopRequireDefault(_utilsGetLoaders);

var _utilsGetPlugins = require('../utils/getPlugins');

var _utilsGetPlugins2 = _interopRequireDefault(_utilsGetPlugins);

var _utilsGetEntries = require('../utils/getEntries');

var Client = (function () {

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   definitions: object,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function Client(options) {
    _classCallCheck(this, Client);

    (0, _utilsValidateOpts2['default'])(Client.reqs, options);

    if (!_immutable.Map.isMap(options.devServer)) {
      options.devServer = (0, _immutable.Map)(options.devServer);
    }

    this.options = options;
  }

  _createClass(Client, [{
    key: 'create',

    // Options:
    // * isProd: whether we're in production mode
    // * entry:  file, directory or array of entry points; defaults to getNestedEntries
    /**
     * @param options {{
     *   [entry]:  {}|[],
     *   output: {
     *     path:            string
     *     [publicPath]:    string
     *     [filename]:      string
     *     [chunkFilename]: string
     *   },
     *   [resolveRoot]: string,
     *   [plugins]:     [],
     *   [debug]:       bool,
     *   [externals]:   {},
     *   [postcss]:     {}
     * }}
     *
     * @returns {{
     *  entry:  {}|[],
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
      (0, _utilsValidateOpts2['default'])({
        output: { type: 'object', props: ['path'] }
      }, options);

      var opts = _extends({
        debug: !this.options.isProd,
        devtool: this.options.isProd ? 'sourcemap' : 'eval',

        entry: this.getNestedEntries(),

        module: {
          loaders: this.getLoaders()
        },

        plugins: this.getPlugins(),

        resolve: {
          root: this.options.resolveRoot,
          extensions: ['', '.js', '.jsx', '.json']
        },

        postcss: {
          defaults: [_autoprefixerCore2['default']]
        }
      }, options);

      // TODO: validate output for conformance
      //validateOpts({
      //  output: {type: 'object', props: ['path']}
      //}, options);

      return opts;
    }
  }, {
    key: 'getEntries',

    /**
     * @param [ext]
     * @param [key]
     */
    value: function getEntries(ext, key) {
      var entries = (0, _utilsGetEntries.getEntries)(this.options.appDir, ext, key);

      return this.getDevEntries(entries);
    }
  }, {
    key: 'getNestedEntries',

    /**
     * @param [entry]
     * @returns {{}}
     */
    value: function getNestedEntries(entry) {
      var entries = (0, _utilsGetEntries.getNestedEntries)(this.options.appDir, entry);

      return this.getDevEntries(entries);
    }
  }, {
    key: 'getOutput',
    value: function getOutput(options) {
      options.publicPath = this.options.isProd ? '/' : this.options.devServer.get('url');

      return (0, _utilsGetOutput2['default'])(this.options.urls.js, options);
    }
  }, {
    key: 'getLoaders',

    // TODO: make customisable
    value: function getLoaders() {
      return (0, _utilsGetLoaders2['default'])(this.options.isProd, this.options.srcs);
    }
  }, {
    key: 'getPlugins',

    // TODO: make customisable
    value: function getPlugins() {
      return (0, _utilsGetPlugins2['default'])(this.options.isProd, this.options.definitions, this.options.urls);
    }
  }, {
    key: 'getHotloaderPlugins',

    /**
     * @param host
     * @returns {string[]}
     */
    value: function getHotloaderPlugins(host) {
      return ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server'];
    }
  }, {
    key: 'getDevEntries',

    // In development mode an additional `dev` entry point is injected
    // (includes hot code loading and development server code)
    /**
     * @param entries
     * @returns {*}
     */
    value: function getDevEntries(entries) {
      if (!this.options.isProd) {
        var host = this.options.devServer.get('url');
        entries.dev = this.getHotloaderPlugins(host);
      }

      return entries;
    }
  }], [{
    key: 'reqs',
    value: {
      isProd: { type: 'boolean' },
      resolveRoot: { type: 'string', path: true },
      appDir: { type: 'string', path: true },
      devServer: { type: 'object', props: ['host', 'port', 'url'] },
      definitions: { type: 'object', props: ['process.env'] },
      srcs: { type: 'object' },
      urls: { type: 'object' }
    },
    enumerable: true
  }]);

  return Client;
})();

exports['default'] = Client;
module.exports = exports['default'];