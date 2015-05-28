import { expect } from 'chai';
import { Map } from 'immutable';

import DevServer from '../../src/lib/devServer';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001'
};

const mockClientOutput = {
  path:       '/foo/bar/baz',
  publicPath: 'http://localhost:3001/'
};

const devServer = new DevServer(mockDevServer);

describe('lib/devServer', () => {
  it('calling create exposes an options object', () => {
    let options = devServer.create(mockClientOutput);

    expect(options).to.deep.equal({
      server:  mockDevServer,
      options: {
        contentBase: '/foo/bar/baz',
        publicPath:  'http://localhost:3001/',
        hot:         true,
        noInfo:      true,
        progress:    true,
        stats:       {colors: true}
      }
    });
  });
});
