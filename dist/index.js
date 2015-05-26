'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libClient = require('./lib/client');

var _libClient2 = _interopRequireDefault(_libClient);

var _libSsr = require('./lib/ssr');

var _libSsr2 = _interopRequireDefault(_libSsr);

var _libSsr3 = _interopRequireDefault(_libSsr);

var _utilsGetServerOpts = require('./utils/getServerOpts');

var _utilsGetServerOpts2 = _interopRequireDefault(_utilsGetServerOpts);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var Packer = function Packer(options) {
  _classCallCheck(this, Packer);

  this.options = _extends(options, { isProd: isProd });

  this.ssr = new _libSsr2['default'](this.options);
  this.client = new _libClient2['default'](this.options);
  this.dev = new _libSsr3['default']();
};

exports['default'] = Packer;
exports.getServerOpts = _utilsGetServerOpts2['default'];