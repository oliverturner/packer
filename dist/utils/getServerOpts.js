'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var requiredKeys = ['host', 'port'];

// `options` is an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param {Map} options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 *
 * @returns {Map}
 */
function getServerOpts(options) {
  (0, _assert2['default'])(_immutable.Map.isMap(options), 'options must be an instance of Immutable Map');

  requiredKeys.forEach(function (key) {
    if (!options.get(key)) {
      throw new Error('Missing value for options.' + key);
    }
  });

  options = options.set('url', 'http://' + options.get('host') + ':' + options.get('port'));

  return options;
}

exports['default'] = getServerOpts;
module.exports = exports['default'];