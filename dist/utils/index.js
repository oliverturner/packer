/**
 * Created by oliverturner on 27/05/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getEntries = require('./getEntries');

var _getEntries2 = _interopRequireDefault(_getEntries);

var _getLoaders = require('./getLoaders');

var _getLoaders2 = _interopRequireDefault(_getLoaders);

var _getOutput = require('./getOutput');

var _getOutput2 = _interopRequireDefault(_getOutput);

var _getPathUrls = require('./getPathUrls');

var _getPathUrls2 = _interopRequireDefault(_getPathUrls);

var _getPlugins = require('./getPlugins');

var _getPlugins2 = _interopRequireDefault(_getPlugins);

var _getServerOpts = require('./getServerOpts');

var _getServerOpts2 = _interopRequireDefault(_getServerOpts);

var _validateOpts = require('./validateOpts');

var _validateOpts2 = _interopRequireDefault(_validateOpts);

exports['default'] = {
  getEntries: _getEntries2['default'],
  getLoaders: _getLoaders2['default'],
  getOutput: _getOutput2['default'],
  getPathUrls: _getPathUrls2['default'],
  getPlugins: _getPlugins2['default'],
  getServerOpts: _getServerOpts2['default'],
  validateOpts: _validateOpts2['default']
};
module.exports = exports['default'];