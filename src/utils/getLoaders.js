import {Map} from 'immutable';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getLoader from './getLoader';

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
function getLoaders (isProd = false, srcs = {}) {
  let sassLoaders = [
    'css',
    'postcss',
    'sass?includePaths[]=' + srcs.sass
  ].map(getLoader);

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
      loader: ['style-loader'].concat(sassLoaders).join('!')
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
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
    },
    jsx: {
      test:    /\.jsx?$/,
      exclude: /node_modules/,
      loader:  'babel',
      query:   {
        optional: ['runtime'],
        stage:    0
      }
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
