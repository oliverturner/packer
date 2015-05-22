import fs from 'fs';
import path from 'path';
import assert from 'assert';
import webpack from 'webpack';

import {getEntries, getNestedEntries} from '../utils/getEntries';

class SSR {

  constructor (isProd) {
    this.isProd = isProd;

    this.getEntries = getEntries;
    this.getNestedEntries = getNestedEntries;
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
}

export default SSR;
