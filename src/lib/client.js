import assert from 'assert';
import autoprefixer from 'autoprefixer-core';

import _getLoaders from '../utils/getLoaders';
import _getPlugins from '../utils/getPlugins';
import _getOutput from '../utils/getOutput';
import {
  getEntries as _getEntries,
  getNestedEntries as _getNestedEntries
  } from '../utils/getEntries';

class Client {

  /**
   * @param options {{
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    this.options = options;
  }

  // Options:
  // * isProd: whether we're in production mode
  // * entry:  file, directory or array of entry points
  /**
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

    let resolveRoot = options.resolveRoot || this.options.resolveRoot;

    assert(resolveRoot, `resolveRoot may not be omitted`);

    return Object.assign({
      // Replaced values
      entry:  [],
      output: {},

      debug:   !this.options.isProd,
      devtool: this.options.isProd ? 'sourcemap' : 'eval',

      resolve: {
        root:       resolveRoot,
        extensions: ['', '.js', '.jsx', '.json']
      },

      postcss: {
        defaults: [autoprefixer]
      }
    }, options);
  }

  /**
   * @param [ext]
   * @param [key]
   */
  getEntries (ext, key) {
    let entries = _getEntries(this.options.appDir, ext, key);

    return this.getDevEntries(entries);
  }

  /**
   * @param [entry]
   * @returns {{}}
   */
  getNestedEntries (entry) {
    let entries = _getNestedEntries(this.options.appDir, entry);

    return this.getDevEntries(entries);
  }

  getOutput (options) {
    options.publicPath = this.options.isProd
      ? '/'
      : this.options.devServer.url + '/';

    return _getOutput(this.options.urls.js, options);
  }

  getLoaders () {
    return _getLoaders(this.options.isProd, this.options.srcs);
  }

  getPlugins () {
    return _getPlugins(this.options.isProd, this.options.urls);
  }

  /**
   * @param host
   * @returns {string[]}
   */
  getHotloaderPlugins (host) {
    return [
      `webpack-dev-server/client?${host}`,
      'webpack/hot/dev-server'
    ];
  }

  // In development mode an additional `dev` entry point is injected
  // (includes hot code loading and development server code)
  /**
   * @param entries
   * @returns {*}
   */
  getDevEntries (entries) {
    if (!this.options.isProd) {
      let host = this.options.devServer.url;
      entries.dev = this.getHotloaderPlugins(host);
    }

    return entries;
  }
}

export default Client;
