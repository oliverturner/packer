'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libClient = require('./lib/client');

var _libClient2 = _interopRequireDefault(_libClient);

var _libSsr = require('./lib/ssr');

var _libSsr2 = _interopRequireDefault(_libSsr);

var _libDevServer = require('./lib/devServer');

var _libDevServer2 = _interopRequireDefault(_libDevServer);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var Packer = (function () {

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   Map,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function Packer(options) {
    _classCallCheck(this, Packer);

    this.ssr = new _libSsr2['default'](options);
    this.client = new _libClient2['default'](options);
    this.dev = new _libDevServer2['default'](options.devServer);
  }

  _createClass(Packer, null, [{
    key: 'utils',

    // expose utils on Packer prototype
    // e.g. Packer.utils.getEntries
    value: _utils2['default'],
    enumerable: true
  }]);

  return Packer;
})();

exports['default'] = Packer;
module.exports = exports['default'];