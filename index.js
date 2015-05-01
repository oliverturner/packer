'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _ExtractTextPlugin = require('extract-text-webpack-plugin');

var _ExtractTextPlugin2 = _interopRequireDefault(_ExtractTextPlugin);

var env = process.env.NODE_ENV || 'development';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders(paths) {
  var loaders = {
    json: {
      test: /\.json$/,
      loaders: ['json']
    },
    expose: {
      react: {
        test: require.resolve('react'),
        loader: 'expose?React'
      }
    },
    sass: {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass?includePaths[]=' + paths.sass]
    },
    jsx: {
      test: /\.js|x$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }
  };

  // Production overrides
  if (env === 'production') {
    loaders = _extends(loaders, {
      sass: {
        test: /\.scss$/,
        loader: _ExtractTextPlugin2['default'].extract('style-loader', 'css-loader!sass-loader?includePaths[]=' + paths.sass)
      }
    });
  }

  return loaders;
}

function getPlugins() {
  var defaults, development, production;

  defaults = [new _webpack2['default'].optimize.CommonsChunkPlugin('common.js'), new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin(), new _ExtractTextPlugin2['default']('[name].css')];

  development = [new _webpack2['default'].HotModuleReplacementPlugin()];

  production = [new _webpack2['default'].optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  }), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.DedupePlugin()];

  return env === 'production' ? defaults.concat(production) : defaults.concat(development);
}

// Export
//-----------------------------------------------
/**
 * Return a Webpack config
 *
 * @param wpOptions {{
 *
 * }}
 * @param paths
 * @returns {*}
 */
module.exports = function (wpOptions, paths) {
  return _extends(wpOptions, {
    module: {
      loaders: getLoaders(paths)
    },

    plugins: getPlugins(),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    }
  });
};