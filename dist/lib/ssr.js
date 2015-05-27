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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _utilsGetEntries = require('../utils/getEntries');

var SSR = (function () {

  /**
   * @param options {{
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function SSR(options) {
    _classCallCheck(this, SSR);

    this.options = options;
  }

  _createClass(SSR, [{
    key: '_getNodeModules',
    value: function _getNodeModules() {
      var nodeModules = {};
      _fs2['default'].readdirSync(_path2['default'].resolve('' + process.cwd() + '/node_modules')).filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
      }).forEach(function (mod) {
        return nodeModules[mod] = 'commonjs ' + mod;
      });

      return nodeModules;
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
      (0, _assert2['default'])(options, 'options may not be omitted');
      (0, _assert2['default'])(options.entry, 'options.entry may not be omitted');
      (0, _assert2['default'])(options.output, 'options.output may not be omitted');

      var resolveRoot = options.resolveRoot || this.options.resolveRoot;

      (0, _assert2['default'])(resolveRoot, 'resolveRoot may not be omitted');

      return _extends({
        target: 'node',
        module: {
          loaders: [{ test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }]
        },
        plugins: [new _webpack2['default'].NormalModuleReplacementPlugin(/\.scss$/, 'node-noop')],
        resolve: {
          root: resolveRoot,
          extensions: ['', '.js', '.jsx', '.json']
        },
        externals: this._getNodeModules()
      }, options);
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
      (0, _assert2['default'])(options.path, 'options.path may not be omitted');

      var defaults = {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
      };

      return _extends(defaults, options);
    }
  }]);

  return SSR;
})();

exports['default'] = SSR;
module.exports = exports['default'];