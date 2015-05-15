'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _getLoader = require('./getLoader');

var _getLoader2 = _interopRequireDefault(_getLoader);

// Return an array of loaders for the various file types
// In production we remove the ReactHotLoader and Sass plugins
/**
 * @param {bool} isProd
 * @param {string} sassPath
 *
 * @returns {Array}
 */
function getLoaders(isProd, sassPath) {
  var loaders = undefined,
      sassLoaders = undefined;

  sassLoaders = ['css', 'postcss', 'sass?includePaths[]=' + sassPath];
  sassLoaders = sassLoaders.map(_getLoader2['default']).join('!');

  loaders = {
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
      loader: sassLoaders
    },
    jsx: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  };

  // Production overrides
  if (isProd) {
    loaders = _extends(loaders, {
      sass: {
        test: /\.scss$/,
        loader: _extractTextWebpackPlugin2['default'].extract('style-loader', sassLoaders)
      },
      jsx: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).map(function (key) {
    return loaders[key];
  });
}

exports['default'] = getLoaders;
module.exports = exports['default'];