'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libClient = require('./lib/client');

var _libClient2 = _interopRequireDefault(_libClient);

var _libSsr = require('./lib/ssr');

var _libSsr2 = _interopRequireDefault(_libSsr);

var _libDevServer = require('./lib/devServer');

var _libDevServer2 = _interopRequireDefault(_libDevServer);

var _utilsValidateOpts = require('./utils/validateOpts');

var _utilsValidateOpts2 = _interopRequireDefault(_utilsValidateOpts);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var Packer = (function () {

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   Map,
   *   definitions: {},
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function Packer(options) {
    _classCallCheck(this, Packer);

    (0, _utilsValidateOpts2['default'])(Packer.reqs, options);

    // TODO: use map and deepMerge to keep default vals?
    var defaults = {
      definitions: {
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProd ? 'production' : 'development')
        }
      }
    };

    var opts = _extends(defaults, options);

    this.ssr = new _libSsr2['default'](opts);
    this.client = new _libClient2['default'](opts);
    this.dev = new _libDevServer2['default'](opts.devServer);
  }

  _createClass(Packer, null, [{
    key: 'reqs',
    value: {
      isProd: { type: 'boolean' },
      devServer: { type: 'object', props: ['host', 'port', 'url'] }
    },
    enumerable: true
  }, {
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