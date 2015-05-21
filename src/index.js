import Client from './client';
import SSR from './ssr';

// TODO: move into DevServer class
import getServerOpts from './utils/getServerOpts';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

export default {
  ssr:    new SSR(isProd),
  client: new Client(isProd),
  dev:    {
    getOpts: getServerOpts
  }
};
