import fs from 'fs';
import path from 'path';
import assert from 'assert';
import webpack from 'webpack';

import {
  getEntries as _getEntries,
  getNestedEntries as _getNestedEntries
  } from '../utils/getEntries';

class SSR {

  constructor (options) {
    this.options = options;
  }

  _getNodeModules () {
    let nodeModules = {};
    fs.readdirSync(path.resolve(`${process.cwd()}/node_modules`))
      .filter(x => ['.bin'].indexOf(x) === -1)
      .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

    return nodeModules;
  }

  create (options) {
    assert(options, 'options may not be omitted');
    assert(options.entry, `options.entry may not be omitted`);
    assert(options.output, `options.output may not be omitted`);

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
      externals: this._getNodeModules()
    }, options);
  }

  /**
   * @param [ext]
   * @param [key]
   */
  getEntries (ext, key) {
    return _getEntries(this.options.srcs.js, ext, key);
  }

  /**
   * @param [entry]
   * @returns {{}}
   */
  getNestedEntries (entry) {
    return _getNestedEntries(this.options.srcs.js, entry);
  }
}

export default SSR;
