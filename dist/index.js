'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _ssr = require('./ssr');

var _ssr2 = _interopRequireDefault(_ssr);

// TODO: move into DevServer class

var _utilsGetServerOpts = require('./utils/getServerOpts');

var _utilsGetServerOpts2 = _interopRequireDefault(_utilsGetServerOpts);

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

exports['default'] = {
  ssr: new _ssr2['default'](isProd),
  client: new _client2['default'](isProd),
  dev: {
    getOpts: _utilsGetServerOpts2['default']
  }
};
module.exports = exports['default'];