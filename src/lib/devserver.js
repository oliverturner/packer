import {Map} from 'immutable';

import validateOpts from '../utils/validateOpts';

class DevServer {

  static reqs = {
    devServer: {type: 'object', props: ['host', 'port', 'url']}
  };

  /**
   * @param {Map} devServer
   */
  constructor (devServer) {
    validateOpts(DevServer.reqs, {devServer});

    this._server = Map.isMap(devServer) ? devServer : Map(devServer);

    this._defaults = Map({
      publicPath: this._server.get('url'),
      hot:        true,
      noInfo:     true,
      progress:   true,
      stats:      {colors: true}
    });
  }

  /**
   * @param {string} outputPath
   * @returns {{
   *   options: {},
   *   server:  {}
   * }}
   */
  create (outputPath) {
    validateOpts({outputPath: {type: 'string', path: true}}, {outputPath});

    this._options = this._defaults.set('contentBase', outputPath);

    return {
      options: this._options.toObject(),
      server:  this._server.toObject()
    };
  }
}

export default DevServer;
