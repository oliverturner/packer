import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.NODE_ENV || 'development';

let defs = {
  'process.env': {
    NODE_ENV: JSON.stringify(env)
  }
};

function getLoaders (paths) {
  let loaders, sassLoaders;

  sassLoaders = ['style', 'css', 'postcss', 'sass?includePaths[]=' + paths.sass];

  loaders = {
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
      loaders: sassLoaders
    },
    jsx:    {
      test:    /\.js|x$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    }
  };

  // Production overrides
  if (env === 'production') {
    loaders = Object.assign(loaders, {
      sass: {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract(sassLoaders)
      },
      jsx: {
        test:    /\.js|x$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    });
  }

  return loaders;
}

function getPlugins () {
  let defaults, development, production;

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
 * @param options {{
 *
 * }}
 * @param paths {{}}
 * @returns {*}
 */
module.exports = function (options, paths) {
  return Object.assign({
    module: {
      loaders: getLoaders(paths)
    },

    plugins: getPlugins(),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [autoprefixer]
    }
  }, options);
};
