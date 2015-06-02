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

    // TODO: use map and deepMerge to keep default vals?
    let defaults = {
      definitions: {
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProd ? 'production' : 'development')
        }
      }
    };

    let opts = Object.assign(defaults, options);

    this.ssr    = new SSR(opts);
    this.client = new Client(opts);
    this.dev    = new DevServer(opts.devServer);
  }
}

export default Packer;
