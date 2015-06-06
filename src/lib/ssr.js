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
    isProd:      {type: 'boolean'},
    resolveRoot: {type: 'string', path: true},
    appDir:      {type: 'string', path: true},
    definitions: {type: 'object', props: ['process.env']}
  };

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   string,
   *   definitions: {},
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    validateOpts(SSR.reqs, options);

    this.options = options;
  }

  _getNodeModules () {
    return fs.readdirSync(path.resolve(`${process.cwd()}/node_modules`))
      .filter(x => ['.bin'].indexOf(x) === -1)
      .reduce((nodeModules, mod) => {
        nodeModules[mod] = {
          commonjs:  mod,
          commonjs2: mod
        };

        return nodeModules;
      }, {});
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
    let opts = Object.assign({
      target:    'node',
      module:    {
        loaders: [
          {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/}
        ]
      },
      plugins:   [
        new webpack.DefinePlugin(this.options.definitions),
        new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'),
        new webpack.NoErrorsPlugin()
      ],
      resolve:   {
        root:       this.options.resolveRoot,
        extensions: ['', '.js', '.jsx', '.json']
      },
      externals: this._getNodeModules(),
      node: {
        __dirname:  true,
        __filename: true
      }
    }, options);

    return validateOpts({
      entry:  {},
      output: {type: 'object', props: ['path']}
    }, opts);
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
    let defaults = {
      filename:      '[name].js',
      libraryTarget: 'commonjs2'
    };

    let opts = Object.assign(defaults, options);

    return validateOpts({path: {type: 'string', path: true}}, opts);
  }
}

export default SSR;
