import { expect } from 'chai';
import { Map } from 'immutable';
import mockFS from 'mock-fs';

import DevServer from '../../src/lib/devServer';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001/'
};

const mockTree = {
  '/path/to/web_modules': {
    sass: {},
    js:   {
      apps: {}
    }
  }
};

const mockClient = {
  output: {
    path: '/path/to/web_modules'
  }
};

const devServer = new DevServer(mockDevServer);

describe('lib/devServer', () => {
  it('calling create exposes an options object', () => {
    mockFS(mockTree);
    let options = devServer.create(mockClient.output.path);

    expect(options).to.deep.equal({
      server:  mockDevServer,
      options: {
        contentBase: '/path/to/web_modules',
        publicPath:  'http://localhost:3001/',
        hot:         true,
        noInfo:      true,
        progress:    true,
        stats:       {colors: true}
      }
    });

    mockFS.restore();
  });
});
