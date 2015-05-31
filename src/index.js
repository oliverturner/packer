import Client from './lib/client';
import SSR from './lib/ssr';
import DevServer from './lib/devServer';

import utils from './utils';

class Packer {

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
    this.ssr    = new SSR(options);
    this.client = new Client(options);
    this.dev    = new DevServer(options.devServer);
  }
}

export default Packer;
