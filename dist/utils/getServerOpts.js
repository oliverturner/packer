'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _immutable = require('immutable');

var requiredKeys = ['host', 'port'];

// `options` is an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 */
function getServerOpts(options) {
  if (!_immutable.Map.isMap(options)) {
    throw new Error('options must be an instance of Immutable Map');
  }

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