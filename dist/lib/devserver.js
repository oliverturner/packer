'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _immutable = require('immutable');

var DevServer = (function () {
  function DevServer() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DevServer);

    this._server = options.devServer;

    this._options = (0, _immutable.Map)({});

    this._defaults = (0, _immutable.Map)({
      hot: true,
      noInfo: true,
      progress: true,
      stats: { colors: true }
    });
  }

  _createClass(DevServer, [{
    key: 'create',

    /**
     * @param clientOutput {{
     *   path:       string,
     *   publicPath: string,
     * }}
     * @returns {{}|*}
     */
    value: function create(clientOutput) {
      this._options = this._defaults.merge({
        contentBase: clientOutput.path,
        publicPath: clientOutput.publicPath
      });

      return this.options;
    }
  }, {
    key: 'options',
    get: function () {
      return this._options.toObject();
    }
  }, {
    key: 'server',
    get: function () {
      return this._server.toObject();
    }
  }]);

  return DevServer;
})();

exports['default'] = DevServer;
module.exports = exports['default'];