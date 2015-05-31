'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _immutable = require('immutable');

var _utilsValidateOpts = require('../utils/validateOpts');

var _utilsValidateOpts2 = _interopRequireDefault(_utilsValidateOpts);

var DevServer = (function () {

  /**
   * @param {Map} devServer
   */

  function DevServer(devServer) {
    _classCallCheck(this, DevServer);

    (0, _utilsValidateOpts2['default'])(DevServer.reqs, { devServer: devServer });

    this._server = _immutable.Map.isMap(devServer) ? devServer : (0, _immutable.Map)(devServer);

    this._defaults = (0, _immutable.Map)({
      publicPath: this._server.get('url'),
      hot: true,
      noInfo: true,
      progress: true,
      stats: { colors: true }
    });
  }

  _createClass(DevServer, [{
    key: 'create',

    /**
     * @param {string} outputPath
     * @returns {{
     *   options: {},
     *   server:  {}
     * }}
     */
    value: function create(outputPath) {
      (0, _utilsValidateOpts2['default'])({ outputPath: { type: 'string', path: true } }, { outputPath: outputPath });

      this._options = this._defaults.set('contentBase', outputPath);

      return {
        options: this._options.toObject(),
        server: this._server.toObject()
      };
    }
  }], [{
    key: 'reqs',
    value: {
      devServer: { type: 'object', props: ['host', 'port', 'url'] }
    },
    enumerable: true
  }]);

  return DevServer;
})();

exports['default'] = DevServer;
module.exports = exports['default'];