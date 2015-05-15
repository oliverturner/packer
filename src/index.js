// Return a Webpack config
import assert from 'assert';
import autoprefixer from 'autoprefixer-core';

import getLoaders from './utils/getLoaders';
import getPlugins from './utils/getPlugins';
import updateOutput from './utils/updateOutput';

// Exported utils
import getEntries from './utils/getEntries';
import getServerOpts from './utils/getServerOpts';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

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
    assert(options, 'options may not be omitted');
    assert(options.entry, `options.entry may not be omitted`);
    assert(options.output, `options.output may not be omitted`);

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
