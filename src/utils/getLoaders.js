import {Map} from 'immutable';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getLoader from './getLoader';

// Return an array of loaders for the various file types
// In production
// * Remove the ReactHotLoader
// * Swap the sass-loader for ExtractTextPlugin to emit static CSS
/**
 * @param {bool} isProd
 * @param {string} sassPath
 *
 * @returns {Array}
 */
function getLoaders (isProd = false, sassPath = '') {
  let sassLoaders = [
    'css',
    'postcss',
    'sass?includePaths[]=' + sassPath
  ].map(getLoader).join('!');

  let loaders = Map({
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
  });

  let prodLoaders = Map({
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

  // Production overrides
  // * sass: use ExtractTextPlugin to output static CSS
  // * jsx:  drop react-hot-loader
  if (isProd) {
    loaders = loaders.merge(prodLoaders);
  }

  return loaders.toArray();
}

export default getLoaders;
