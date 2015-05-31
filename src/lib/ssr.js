import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import validateOpts from '../utils/validateOpts';
import {
  getEntries as _getEntries,
  getNestedEntries as _getNestedEntries
  }
  from '../utils/getEntries';

class SSR {

  static reqs = {
    resolveRoot: {type: 'string', path: true},
    appDir:      {type: 'string', path: true}
  };

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    validateOpts(SSR.reqs, options);

    this.options = options;
  }

  _getNodeModules () {
    let nodeModules = {};
    fs.readdirSync(path.resolve(`${process.cwd()}/node_modules`))
      .filter(x => ['.bin'].indexOf(x) === -1)
      .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

    return nodeModules;
  }

  /**
   * @param options {{
   *   entry:         [],
   *   output:        {
   *     path:          string,
   *     filename:      string,
   *     libraryTarget: string
   *   },
   *   [resolveRoot]: string
   * }}
   * @returns {*}
   */
  create (options) {
    validateOpts({
      entry:  {},
      output: {type: 'object', props: ['path']}
    }, options);

    return Object.assign({
      target:    'node',
      module: {
        loaders: [
          {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/}
        ]
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop')
      ],
      resolve: {
        root:       this.options.resolveRoot,
        extensions: ['', '.js', '.jsx', '.json']
      },
      externals: this._getNodeModules()
    }, options);
  }

  /**
   * @param [ext]
   * @param [key]
   */
  getEntries (ext, key) {
    return _getEntries(this.options.appDir, ext, key);
  }

  /**
   * @param [entry]
   * @returns {{}}
   */
  getNestedEntries (entry) {
    return _getNestedEntries(this.options.appDir, entry);
  }

  getOutput (options) {
    validateOpts({path: {type: 'string', path: true}}, options);

    let defaults = {
      filename:      '[name].js',
      libraryTarget: 'commonjs2'
    };

    return Object.assign(defaults, options);
  }
}

export default SSR;
