import { expect } from 'chai';
import { Map } from 'immutable';

import DevServer from '../../src/lib/devServer';

const devServer = new DevServer({
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001'
});

describe('lib/devServer', () => {
  it('creates a map from an object argument', () => {
    expect(devServer._server).to.be.an.instanceOf(Map);
  });

  it('exposes a server object', () => {
    expect(devServer.server).to.deep.equal({
      host: 'localhost',
      port: '3001',
      url:  'http://localhost:3001'
    });
  });

  it('calling create exposes an options object', () => {
    let options = devServer.create({
      path:       '/foo/bar/baz',
      publicPath: 'http://localhost:3001/'
    });

    expect(options).to.deep.equal({
      contentBase: '/foo/bar/baz',
      publicPath:  'http://localhost:3001/',
      hot:      true,
      noInfo:   true,
      progress: true,
      stats:    {colors: true}
    });
  });
});
