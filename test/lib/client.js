import { expect } from 'chai';
import { Map } from 'immutable';
import mockFS from 'mock-fs';

import Client from '../../src/lib/client';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001/'
};

const mockOpts = Map({
  isProd:      false,
  devServer:   mockDevServer,
  resolveRoot: './examples/multi/src',
  appDir:      './examples/multi/src/apps',
  srcs:        {
    js:   './examples/multi/src/apps',
    sass: './examples/multi/src/sass'
  },
  urls:        {
    js: 'js'
  }
});

const mockTree = {
  '/path/to/web_modules': {
    sass: {},
    js:   {
      apps: {}
    }
  }
};

describe('lib/client', () => {
  describe('Configuration', () => {
    it('checks for missing config values', () => {
      mockFS(mockTree);
      Object.keys(Client.reqs).forEach(key => {
        expect(() => new Client(mockOpts.delete(key).toObject())).to.throw(Error);
      });
      mockFS.restore();
    });
  });

  describe('Output', () => {
    describe('Supplied with valid parameters', () => {
      it('should return an object with expected keys', () => {

        let client = new Client(mockOpts.toObject());
        let config = client.create({
          entry:   [],
          output:  {
            path: './examples/multi/src'
          }
        });

        expect(config).to.contain.all.keys('debug', 'devtool', 'entry', 'output', 'module', 'plugins', 'resolve');
      });
    });
  });
});
