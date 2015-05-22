'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _getLoader = require('./getLoader');

var _getLoader2 = _interopRequireDefault(_getLoader);

// Return an array of loaders for the various file types
// In production
// * Remove the ReactHotLoader
// * Swap the sass-loader for ExtractTextPlugin to emit static CSS
/**
 * @param {bool} isProd
 * @param srcs {{
 *   [sass]: string
 * }}
 *
 * @returns {Array}
 */
function getLoaders() {
  var isProd = arguments[0] === undefined ? false : arguments[0];
  var srcs = arguments[1] === undefined ? {} : arguments[1];

  var sassLoaders = ['css', 'postcss', 'sass?includePaths[]=' + srcs.sass].map(_getLoader2['default']);

  var loaders = (0, _immutable.Map)({
    json: {
      test: /\.json$/,
      loaders: ['json']
    },
    expose: {
      test: require.resolve('react'),
      loader: 'expose?React'
    },
    sass: {
      test: /\.scss$/,
      loader: ['style-loader'].concat(sassLoaders).join('!')
    },
    jsx: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  });

  var prodLoaders = (0, _immutable.Map)({
    sass: {
      test: /\.scss$/,
      loader: _extractTextWebpackPlugin2['default'].extract('style-loader', sassLoaders.join('!'))
    },
    jsx: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }
  });

  // Production overrides
  // * sass: use ExtractTextPlugin to output static CSS
  // * jsx:  drop react-hot-loader
  if (isProd) {
    loaders = loaders.merge(prodLoaders);
  }

  return loaders.toArray();
}

exports['default'] = getLoaders;
module.exports = exports['default'];