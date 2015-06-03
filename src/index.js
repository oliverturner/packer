import {Map} from 'immutable';

import Client from './lib/client';
import SSR from './lib/ssr';
import DevServer from './lib/devServer';
import validateOpts from './utils/validateOpts';

import utils from './utils';

// Parent class
class Packer {

  // Required params
  static reqs = {
    isProd:      {type: 'boolean'},
    devServer:   {type: 'object', props: ['host', 'port', 'url']}
  };

  // expose utils on Packer prototype
  // e.g. Packer.utils.getEntries
  static utils = utils;

  /**
   * @param options {{
   *   isProd:      bool,
   *   resolveRoot: string,
   *   appDir:      string,
   *   devServer:   Map|{},
   *   definitions: {},
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    validateOpts(Packer.reqs, options);

    let defaults = Map({
      definitions: {
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProd ? 'production' : 'development')
        }
      }
    });

    let opts = defaults.mergeDeep(options);

    this.ssr    = new SSR(opts.toObject());
    this.client = new Client(opts.toObject());
    this.dev    = new DevServer(opts.get('devServer'));
  }
}

export default Packer;
