'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _immutable = require('immutable');

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

// Parent class

var Packer = (function () {

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   Map|{},
   *   definitions: {},
   *   srcs:        {},
   *   urls:        {}
   * }}
   */

  function Packer(options) {
    _classCallCheck(this, Packer);

    (0, _utilsValidateOpts2['default'])(Packer.reqs, options);

    var defaults = (0, _immutable.Map)({
      definitions: {
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProd ? 'production' : 'development')
        }
      }
    });

    var opts = defaults.mergeDeep(options);

    this.ssr = new _libSsr2['default'](opts.toObject());
    this.client = new _libClient2['default'](opts.toObject());
    this.dev = new _libDevServer2['default'](opts.get('devServer'));
  }

  _createClass(Packer, null, [{
    key: 'reqs',

    // Required params
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