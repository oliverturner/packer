import Client from './lib/client';
import SSR from './lib/ssr';
import DevServer from './lib/devServer';

import utils from './utils';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

export default class Packer {

  static utils = utils;

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
    this.options = Object.assign(options, {isProd});

    this.ssr    = new SSR(this.options);
    this.client = new Client(this.options);
    this.dev    = new DevServer(this.options);
  }
}
