'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsGetServerOpts = require('./utils/getServerOpts');

var _utilsGetServerOpts2 = _interopRequireDefault(_utilsGetServerOpts);

var DevServer = (function () {
  function DevServer(options) {
    _classCallCheck(this, DevServer);

    this.options = options;

    this.defaults = {
      hot: true,
      noInfo: true,
      progress: true,
      stats: { colors: true }
    };
  }

  _createClass(DevServer, [{
    key: 'getServerOpts',
    value: function getServerOpts() {
      return (0, _utilsGetServerOpts2['default'])();
    }
  }]);

  return DevServer;
})();