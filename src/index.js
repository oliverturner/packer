var assign = require('lodash.assign');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

var defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders (paths) {
  var loaders = {
    json:   {
      test:    /\.json$/,
      loaders: ['json']
    },
    expose: {
      react: {
        test:   require.resolve('react'),
        loader: 'expose?React'
      }
    },
    sass:   {
      test:    /\.scss$/,
      loaders: ['style', 'css', 'sass?includePaths[]=' + paths.sass]
    },
    jsx:    {
      test:    /\.js|x$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }
  };

  // Production overrides
  if (env === 'production') {
    loaders = assign(loaders, {
      sass: {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?includePaths[]=' + paths.sass)
      }
    });
  }

  return loaders;
}

function getPlugins () {
  var defaults, development, production;

  defaults = [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.DefinePlugin(defs),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ];

  development = [
    new webpack.HotModuleReplacementPlugin()
  ];

  production = [
    new webpack.optimize.UglifyJsPlugin({
      output:   {comments: false},
      compress: {warnings: false}
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ];

  return (env === 'production')
    ? defaults.concat(production)
    : defaults.concat(development);
}

// Export
//-----------------------------------------------
/**
 * Return a Webpack config
 *
 * @param wpOptions
 * @param paths
 * @returns {*}
 */
module.exports = function (wpOptions, paths) {
  return assign(wpOptions, {
    module: {
      loaders: getLoaders(paths)
    },

    plugins: getPlugins(),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    }
  });
};
