import {Map} from 'immutable';

class DevServer {

  /**
   * @param {Map} server
   */
  constructor (server) {
    this._server = Map.isMap(server) ? server : Map(server);

    this._options = Map({});

    this._defaults = Map({
      hot:      true,
      noInfo:   true,
      progress: true,
      stats:    {colors: true}
    });
  }

  /**
   * @param clientOutput {{
   *   path:       string,
   *   publicPath: string,
   * }}
   * @returns {{
   *   options: {},
   *   server:  {}
   * }}
   */
  create (clientOutput) {
    this._options = this._defaults.merge({
      contentBase: clientOutput.path,
      publicPath:  clientOutput.publicPath
    });

    return {
      options: this._options.toObject(),
      server:  this._server.toObject()
    };
  }
}

export default DevServer;
