'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var requiredKeys = ['host', 'port'];

/**
 * @param options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 */
function getServerOpts(options) {
  requiredKeys.forEach(function (key) {
    if (!options[key]) {
      throw new Error('Missing value for options.' + key);
    }
  });

  options.url = 'http://' + options.host + ':' + options.port;

  return options;
}

exports['default'] = getServerOpts;
module.exports = exports['default'];