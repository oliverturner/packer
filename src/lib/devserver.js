import {Map} from 'immutable';

class DevServer {

  /**
   * @param {Map} devServer
   */
  constructor (devServer) {
    this._server = devServer;

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

    return this.options;
  }

  get options () {
    return this._options.toObject();
  }

  get server () {
    return this._server.toObject();
  }
}

export default DevServer;
