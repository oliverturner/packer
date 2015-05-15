import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getLoader from './getLoader';

// Return an array of loaders for the various file types
// In production we remove the ReactHotLoader and Sass plugins
/**
 * @param {bool} isProd
 * @param {string} sassPath
 *
 * @returns {Array}
 */
function getLoaders (isProd, sassPath) {
  let loaders, sassLoaders;

  sassLoaders = ['css', 'postcss', '@oliverturner/sass?includePaths[]=' + sassPath];
  sassLoaders = sassLoaders.map(getLoader).join('!');

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
      test:   /\.scss$/,
      loader: sassLoaders
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
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders)
      },
      jsx:  {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    });
  }

  return Object.keys(loaders).map(key => loaders[key]);
}

export default getLoaders;
