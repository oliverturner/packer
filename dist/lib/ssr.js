'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _utilsValidateOpts = require('../utils/validateOpts');

var _utilsValidateOpts2 = _interopRequireDefault(_utilsValidateOpts);

var _utilsGetEntries = require('../utils/getEntries');

var SSR = (function () {

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string, TODO: remove and relocate to getEntries
   *   devServer:   string,
   *   definitions: {},
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function SSR(options) {
    _classCallCheck(this, SSR);

    (0, _utilsValidateOpts2['default'])(SSR.reqs, options);

    this.options = options;
  }

  _createClass(SSR, [{
    key: '_getNodeModules',
    value: function _getNodeModules() {
      return _fs2['default'].readdirSync(_path2['default'].resolve('' + process.cwd() + '/node_modules')).filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
      }).reduce(function (nodeModules, mod) {
        nodeModules[mod] = {
          commonjs: mod,
          commonjs2: mod
        };

        return nodeModules;
      }, {});
    }
  }, {
    key: 'create',

    /**
     * @param options {{
     *   entry:         [],
     *   output:        {
     *     path:          string,
     *     filename:      string,
     *     libraryTarget: string
     *   },
     *   [resolveRoot]: string
     * }}
     * @returns {*}
     */
    value: function create(options) {
      var opts = _extends({
        target: 'node',
        module: {
          loaders: [{ test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }]
        },
        plugins: [new _webpack2['default'].DefinePlugin(this.options.definitions), new _webpack2['default'].NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'), new _webpack2['default'].NoErrorsPlugin()],
        resolve: {
          root: this.options.resolveRoot,
          extensions: ['', '.js', '.jsx', '.json']
        },
        externals: this._getNodeModules(),
        node: {
          __dirname: true,
          __filename: true
        }
      }, options);

      // TODO: make more complete: combine with SSR.reqs
      return (0, _utilsValidateOpts2['default'])({
        entry: {},
        output: { type: 'object', props: ['path'] }
      }, opts);
    }
  }, {
    key: 'getEntries',

    /**
     * @param [ext]
     * @param [key]
     */
    value: function getEntries(ext, key) {
      return (0, _utilsGetEntries.getEntries)(this.options.appDir, ext, key);
    }
  }, {
    key: 'getNestedEntries',

    /**
     * @param [entry]
     * @returns {{}}
     */
    value: function getNestedEntries(entry) {
      return (0, _utilsGetEntries.getNestedEntries)(this.options.appDir, entry);
    }
  }, {
    key: 'getOutput',
    value: function getOutput(options) {
      var defaults = {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
      };

      var opts = _extends(defaults, options);

      return (0, _utilsValidateOpts2['default'])({ path: { type: 'string', path: true } }, opts);
    }
  }], [{
    key: 'reqs',
    value: {
      isProd: { type: 'boolean' },
      resolveRoot: { type: 'string', path: true },
      appDir: { type: 'string', path: true },
      definitions: { type: 'object', props: ['process.env'] }
    },
    enumerable: true
  }]);

  return SSR;
})();

exports['default'] = SSR;
module.exports = exports['default'];