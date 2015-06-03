import autoprefixer from 'autoprefixer-core';
import {Map} from 'immutable';

import validateOpts from '../utils/validateOpts';
import _getOutput from '../utils/getOutput';
import _getLoaders from '../utils/getLoaders';
import _getPlugins from '../utils/getPlugins';
import {
  getEntries as _getEntries,
  getNestedEntries as _getNestedEntries
  }
  from '../utils/getEntries';

class Client {

  static reqs = {
    isProd:      {type: 'boolean'},
    resolveRoot: {type: 'string', path: true},
    appDir:      {type: 'string', path: true},
    devServer:   {type: 'object', props: ['host', 'port', 'url']},
    definitions: {type: 'object', props: ['process.env']},
    srcs:        {type: 'object'},
    urls:        {type: 'object'}
  };

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   definitions: object,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    validateOpts(Client.reqs, options);

    if (!Map.isMap(options.devServer)) {
      options.devServer = Map(options.devServer);
    }

    this.options = options;
  }

  // Options:
  // * isProd: whether we're in production mode
  // * entry:  file, directory or array of entry points; defaults to getNestedEntries
  /**
   * @param options {{
   *   [entry]:  {}|[],
   *   output: {
   *     path:            string
   *     [publicPath]:    string
   *     [filename]:      string
   *     [chunkFilename]: string
   *   },
   *   [resolveRoot]: string,
   *   [plugins]:     [],
   *   [debug]:       bool,
   *   [externals]:   {},
   *   [postcss]:     {}
   * }}
   *
   * @returns {{
   *  entry:  {}|[],
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
    validateOpts({
      output: {type: 'object', props: ['path']}
    }, options);

    let opts = Object.assign({
      debug:   !this.options.isProd,
      devtool: this.options.isProd ? 'sourcemap' : 'eval',

      entry: this.getNestedEntries(),

      module: {
        loaders: this.getLoaders()
      },

      plugins: this.getPlugins(),

      resolve: {
        root:       this.options.resolveRoot,
        extensions: ['', '.js', '.jsx', '.json']
      },

      postcss: {
        defaults: [autoprefixer]
      }
    }, options);

    return opts;
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
      : this.options.devServer.get('url');

    return _getOutput(this.options.urls.js, options);
  }

  // TODO: make customisable
  getLoaders () {
    return _getLoaders(this.options.isProd, this.options.srcs);
  }

  // TODO: make customisable
  getPlugins () {
    return _getPlugins(this.options.isProd, this.options.definitions, this.options.urls);
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
      let host = this.options.devServer.get('url');
      entries.dev = this.getHotloaderPlugins(host);
    }

    return entries;
  }
}

export default Client;
