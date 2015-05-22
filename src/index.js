import Client from './lib/client';
import SSR from './lib/ssr';
import DevServer from './lib/ssr';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

class Packer {
  constructor (options) {
    this.options = Object.assign(options, {isProd});

    this.ssr    = new SSR(this.options);
    this.client = new Client(this.options);
    this.dev    = new DevServer();
  }
}

export default Packer;
