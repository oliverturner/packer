import assert from 'assert';
import autoprefixer from 'autoprefixer-core';

import getLoaders from '../utils/getLoaders';
import getPlugins from '../utils/getPlugins';
import getOutput from '../utils/getOutput';
import {getEntries, getNestedEntries} from '../utils/getEntries';

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
  constructor (options) {
    this.options = options;
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

      debug:   !this.options.isProd,
      devtool: this.options.isProd ? 'sourcemap' : 'eval',

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
   * @param [ext]
   * @param [key]
   */
  getEntries (ext, key) {
    let entries = getEntries(this.options.srcs.js, ext, key);

    // In development mode an additional `dev` entry point is injected
    // (includes hot code loading and development server code)
    if (this.options.isProd) {
      let host = this.options.devServer.url;
      entries.dev = getHotloaderPlugins(host);
    }

    return entries;
  }

  /**
   * @param [entry]
   * @returns {{}}
   */
  getNestedEntries (entry) {
    return getNestedEntries(this.options.srcs.js, entry);
  }

  getOutput (options) {
    options.publicPath = this.options.isProd
      ? '/'
      : this.options.devServer.url + '/';

    return getOutput(this.options.urls.js, options);
  }

  getLoaders () {
    return getLoaders(this.options.isProd, this.options.srcs);
  }

  getPlugins () {
    return getPlugins(this.options.isProd, this.options.urls);
  }
}

export default Client;
