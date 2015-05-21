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
 * @param output {{
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
function getOutput(jsUrl, output) {
  var defaultOutputs = {
    path: null,
    publicPath: '/' + jsUrl + '/',
    filename: '' + jsUrl + '/[name].js',
    chunkFilename: '' + jsUrl + '/[name].js'
  };

  return Object.keys(defaultOutputs).reduce(function (output, key) {
    output[key] = output[key] || defaultOutputs[key];

    (0, _assert2['default'])(output[key], 'output.' + key + ' may not be omitted');

    return output;
  }, output);
}

exports['default'] = getOutput;
module.exports = exports['default'];