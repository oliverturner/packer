import getServerOpts from './utils/getServerOpts';

class DevServer {
  constructor () {
    this.defaults = {
      hot:      true,
      noInfo:   true,
      progress: true,
      stats:    {colors: true}
    };
  }

  getServerOpts () {
    return getServerOpts();
  }
}
