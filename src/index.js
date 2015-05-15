// Return a Webpack config
import autoprefixer from 'autoprefixer-core';

import getLoaders from './utils/getLoaders';
import getPlugins from './utils/getPlugins';
import updateOutput from './utils/updateOutput';

// Exported utils
import getEntries from './utils/getEntries';
import getServerOpts from './utils/getServerOpts';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

function validateOptions (options, requiredKeys) {
  if (!options) {
    throw new Error('options may not be omitted');
  }

  requiredKeys.map(key => {
    if (!options[key]) throw new Error(`options.${key} may not be omitted`);
  });
}

// Export
//-----------------------------------------------
// Options:
// * entry:     file, directory or array of entry points
//
// * jsUrl: path to JS files relative to webRoot
// * srcs:  absolute paths to jsx, scss, etc
/**
 * @param options {{
 *   entry:  string|[]
 *   output: {
 *     path:          string
 *     publicPath:    string
 *     filename:      string
 *     chunkFilename: string
 *   }
 * }}
 * @param {string} jsUrl
 * @param {string} cssUrl
 * @param {string} sassPath
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
class WebPacker {
  constructor (options, jsUrl, cssUrl, sassPath) {
    validateOptions(options, ['entry', 'output']);

    // Fill any missing optional values for `output` with defaults
    options.output = updateOutput(options.output, jsUrl);

    this.options = Object.assign({
      module: {
        loaders: getLoaders(isProd, sassPath)
      },

      plugins: getPlugins(isProd, jsUrl, cssUrl),

      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },

      postcss: {
        defaults: [autoprefixer]
      }
    }, options);

    return this.options;
  }
}

export default WebPacker;

export { getEntries, getServerOpts };
