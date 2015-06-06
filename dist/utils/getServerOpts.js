'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _utilsValidateOpts = require('../utils/validateOpts');

var _utilsValidateOpts2 = _interopRequireDefault(_utilsValidateOpts);

var requiredKeys = {
  host: { type: 'string' },
  port: { type: 'number' },
  url: { type: 'string' }
};

// `options` is coverted to an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param {Map|{}} options {{
 *   host: string,
 *   port: int
 * }}
 *
 * @returns {Map}
 */
function getServerOpts(options) {
  var defaults = (0, _immutable.Map)({
    host: 'localhost'
  });

  options = _immutable.Map.isMap(options) ? options : (0, _immutable.Map)(options);
  options = defaults.merge(options);
  options = options.set('url', 'http://' + options.get('host') + ':' + options.get('port') + '/');

  return (0, _utilsValidateOpts2['default'])(requiredKeys, options);
}

exports['default'] = getServerOpts;
module.exports = exports['default'];