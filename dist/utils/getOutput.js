'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

// Fill unsupplied values for output key
/**
 * @param {string} jsUrl
 * @param options {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 *
 * @returns {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 */
function getOutput(jsUrl, options) {
  (0, _assert2['default'])(jsUrl, 'jsUrl may not be omitted');

  var defaults = {
    path: null,
    publicPath: '/',
    filename: '' + jsUrl + '/[name].js',
    chunkFilename: '' + jsUrl + '/[name].js'
  };

  // TODO: use Map.merge
  return Object.keys(defaults).reduce(function (output, key) {
    output[key] = output[key] || defaults[key];

    (0, _assert2['default'])(output[key], 'options.' + key + ' may not be omitted');

    return output;
  }, options);
}

exports['default'] = getOutput;
module.exports = exports['default'];