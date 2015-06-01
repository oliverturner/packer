import Client from './lib/client';
import SSR from './lib/ssr';
import DevServer from './lib/devServer';

import utils from './utils';

class Packer {

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
   *   devServer:   Map,
   *   srcs:        {},
   *   urls:        {}
   * }}
   */
  constructor (options) {
    Packer.utils.validateOpts(Packer.reqs, options);

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
