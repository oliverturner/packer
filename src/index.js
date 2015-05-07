import webpack from 'webpack';
import autoprefixer from 'autoprefixer-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

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
      test:   require.resolve('react'),
      loader: 'expose?React'
    },
    sass:   {
      test:    /\.scss$/,
      loaders: sassLoaders
    },
    jsx:    {
      test:    /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }
  };

  // Production overrides
  if (isProd) {
    loaders = Object.assign(loaders, {
      sass: {
        test:   /\.scss$/,
        loader: ExtractTextPlugin.extract(sassLoaders)
      },
      jsx: {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).reduce((ret, key) => {
    ret.push(loaders[key]);

    return ret;
  }, []);
}

function getPlugins (paths) {
  let defaults, development, production;

  defaults = [
    new webpack.optimize.CommonsChunkPlugin(`${paths.js}/common.js`),
    new webpack.DefinePlugin(defs),
    new webpack.NoErrorsPlugin()
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
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.css')
  ];

  return (isProd)
    ? defaults.concat(production)
    : defaults.concat(development);
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
 *   docRoot: string,
 *   sass:    string
 * }}
 *
 * @returns {{
 *  entry:  string|[]
 *  output: {
 *     publicPath: string
 *     path:       string
 *     filename:   string
 *   },
 *   module: {
 *     loaders: []
 *   },
 *   plugins: [],
 *   resolve: {},
 *   postcss: {}
 * }}
 */
module.exports = function (options, paths) {
  let defaults = {
    entry:  'web_modules',
    output: {
      publicPath: 'http://localhost:3001',
      path:       'public',
      filename:   `js/[name].js`
    }
  }

  options = Object.assign(defaults, options);

  paths = Object.assign({
    sass: 'src/sass'
  }, paths);

  return Object.assign({
    module: {
      loaders: getLoaders(paths)
    },

    plugins: getPlugins(paths),

    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },

    postcss: {
      defaults: [autoprefixer]
    }
  }, options);
};
