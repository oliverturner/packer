'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _autoprefixer = require('autoprefixer-core');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _ExtractTextPlugin = require('extract-text-webpack-plugin');

var _ExtractTextPlugin2 = _interopRequireDefault(_ExtractTextPlugin);

var env = process.env.NODE_ENV || 'development';
var isDev = env === 'development';
var isProd = env === 'production';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders(paths) {
  var loaders = undefined,
      sassLoaders = undefined;

  sassLoaders = ['style', 'css', 'postcss', 'sass?includePaths[]=' + paths.sass];

  loaders = {
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
      loaders: sassLoaders
    },
    jsx: {
      test: /\.js|x$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }
  };

  // Production overrides
  if (isProd) {
    loaders = _extends(loaders, {
      sass: {
        test: /\.scss$/,
        loader: _ExtractTextPlugin2['default'].extract(sassLoaders)
      },
      jsx: {
        test: /\.js|x$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    });
  }

  return loaders;
}

function getPlugins() {
  var defaults = undefined,
      development = undefined,
      production = undefined;

  defaults = [new _webpack2['default'].optimize.CommonsChunkPlugin('common.js'), new _webpack2['default'].DefinePlugin(defs), new _webpack2['default'].NoErrorsPlugin(), new _ExtractTextPlugin2['default']('[name].css')];

  development = [new _webpack2['default'].HotModuleReplacementPlugin()];

  production = [new _webpack2['default'].optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  }), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.DedupePlugin()];

  return isProd ? defaults.concat(production) : defaults.concat(development);
}

// Export
//-----------------------------------------------
/**
 * Return a Webpack config
 * options.entry can be passed a file, a directory or an array of entry points
 *
 * @param options {{
 *   entry:  string|[]
 *   output: {
 *     publicPath: string
 *     path:       string
 *     filename:   string
 *   }
 * }}
 * @param paths {{
 *   sass: string
 * }}
 * @returns {*}
 */
module.exports = function (options, paths) {
  options = _extends({
    entry: 'web_modules',
    output: {
      publicPath: 'http://localhost:3001/js',
      path: 'public/js',
      filename: '[name].js'
    }
  }, options);

  paths = _extends({
    sass: 'src/sass'
  }, paths);

  return _extends({
    module: {
      loaders: getLoaders(paths)
    },

    plugins: getPlugins(),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [_autoprefixer2['default']]
    }
  }, options);
};