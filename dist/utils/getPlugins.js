'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

// Return an environment-specific array of plugins
/**
 * @param {bool} isProd
 * @param {string} jsUrl
 * @param {string} cssUrl
 * @returns {Array.<T>}
 */
function getPlugins(isProd, jsUrl, cssUrl) {
  var defs = {
    'process.env': {
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
    }
  };

  var commonsChunk = new _webpack2['default'].optimize.CommonsChunkPlugin('commons', '' + jsUrl + '/commons.js');

  var defaults = [new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin()];

  var development = [commonsChunk, new _webpack2['default'].HotModuleReplacementPlugin()];

  var production = [commonsChunk, new _extractTextWebpackPlugin2['default']('' + cssUrl + '/[name].css', {
    allChunks: true
  }), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.DedupePlugin(), new _webpack2['default'].optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  })];

  return isProd ? defaults.concat(production) : defaults.concat(development);
}

exports['default'] = getPlugins;
module.exports = exports['default'];