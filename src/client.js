import assert from 'assert';
import autoprefixer from 'autoprefixer-core';

import getLoaders from './utils/getLoaders';
import getPlugins from './utils/getPlugins';
import getOutput from './utils/getOutput';
import {getEntries, getNestedEntries} from './utils/getEntries';

/**
 * @param host
 * @returns {string[]}
 */
function getHotloaderPlugins (host) {
  return [
    `webpack-dev-server/client?${host}`,
    'webpack/hot/dev-server'
  ];
}

class Client {
  constructor (isProd) {
    this.isProd = isProd;

    this.getLoaders = getLoaders;
    this.getPlugins = getPlugins;
    this.getOutput  = getOutput;
  }

  // Options:
  // * isProd: whether we're in production mode
  // * entry:  file, directory or array of entry points
  /**
   * @param {bool} isProd
   * @param options {{
   *   entry:  string|[],
   *   output: {
   *     path:          string
   *     publicPath:    string
   *     filename:      string
   *     chunkFilename: string
   *   },
   *   [plugins]: [],
   *   [debug]:  bool,
   *   [externals]: {},
   *   [postcss]: {}
   * }}
   *
   * @returns {{
   *  entry:  string|[],
   *  debug:  bool,
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
  create (options) {
    assert(options, 'options may not be omitted');
    assert(options.entry, `options.entry may not be omitted`);
    assert(options.output, `options.output may not be omitted`);

    return Object.assign({
      // Replaced values
      entry:  [],
      output: {},

      debug:   !this.isProd,
      devtool: this.isProd ? 'sourcemap' : 'eval',

      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },

      postcss: {
        defaults: [autoprefixer]
      }
    }, options);
  }

  /**
   * @param host
   * @param appDir
   * @param ext
   * @param key
   */
  getEntries (host, appDir, ext, key) {
    let entries = getEntries(appDir, ext, key);

    // In development mode an additional `dev` entry point is injected
    // (includes hot code loading and development server code)
    if (host) {
      entries.dev = getHotloaderPlugins(host);
    }

    return entries;
  }

  /**
   * @param host
   * @param appDir
   * @param entry
   * @returns {{}}
   */
  getNestedEntries (host, appDir, entry) {
    let entries = getNestedEntries(appDir, entry);

    if (host) {
      entries.dev = getHotloaderPlugins(host);
    }

    return entries;
  }
}

export default Client;
