// Fill unsupplied values for output key
/**
 * @param output {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 * @param {string} jsUrl
 *
 * @returns {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function updateOutput(output, jsUrl) {
  var defaultOutputs = {
    path: null,
    publicPath: "/" + jsUrl + "/",
    filename: "" + jsUrl + "/[name].js",
    chunkFilename: "" + jsUrl + "/[name].js"
  };

  return Object.keys(defaultOutputs).reduce(function (output, key) {
    output[key] = output[key] || defaultOutputs[key];

    if (output[key] === null) {
      throw new Error("output." + key + " may not be omitted");
    }

    return output;
  }, output);
}

exports["default"] = updateOutput;
module.exports = exports["default"];