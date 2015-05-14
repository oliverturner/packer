"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requiredKeys = [host, port];

/**
 * @param {} options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 */

exports["default"] = function (options) {
  requiredKeys.forEach(function (key) {
    if (!options[key]) {
      throw new Error("Missing value for options." + key);
    }
  });

  options.url = "http://" + options.host + ":" + options.port;

  return options;
};

module.exports = exports["default"];