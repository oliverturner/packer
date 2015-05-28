import { expect } from 'chai';
import { Map } from 'immutable';

import DevServer from '../../src/lib/devServer';

const devServer = new DevServer({
  devServer: Map({
    host: 'localhost',
    port: '3001',
    url:  'http://localhost:3001'
  })
});

describe('lib/devServer', () => {
  it('exposes a server object', () => {
    expect(devServer.server).to.deep.equal({
      host: 'localhost',
      port: '3001',
      url:  'http://localhost:3001'
    });
  });

  it('produces an options object from create', () => {
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
