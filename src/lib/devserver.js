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
   * @returns {{}|*}
   */
  create (clientOutput) {
    this._options = this._defaults.merge({
      contentBase: clientOutput.path,
      publicPath:  clientOutput.publicPath
    });

    return this.getOptions();
  }

  getOptions () {
    return this._options.toObject();
  }

  getServer () {
    return this._server.toObject();
  }
}

export default DevServer;
