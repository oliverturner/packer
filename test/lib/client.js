import { expect } from 'chai';
import { Map } from 'immutable';
import mockFS from 'mock-fs';

import Client from '../../src/lib/client';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001/'
};

const mockOptsDev = Map({
  isProd:      false,
  devServer:   mockDevServer,
  resolveRoot: './examples/multi/src',
  appDir:      './examples/multi/src/js/apps',
  definitions: {
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  },
  srcs:        {
    js:   './examples/multi/src/js',
    sass: './examples/multi/src/sass'
  },
  urls:        {
    js:  'js',
    css: 'css'
  }
});

const mockOptsProd = mockOptsDev.set('isProd', true);

function checkMissingOpts (opts) {
  Object.keys(Client.reqs).forEach(key => {
    expect(() => new Client(opts.delete(key).toObject())).to.throw(Error);
  })
}

function clientCreate (opts) {
  let client = new Client(opts);
  let config = client.create({
    output: {
      path: './examples/multi/out'
    }
  });
  return expect(config).to.contain.all.keys('debug', 'devtool', 'entry', 'output', 'module', 'plugins', 'resolve');
}

// TODO: Check other valid / invalid variants of mockOpts
// TODO: check that child methods - getLoaders, getPlugins, etc - work as expected
describe('lib/client', () => {
  describe('Constructor', () => {
    describe('Missing config values', () => {
      it('warns in development', checkMissingOpts.bind(null, mockOptsDev));
      it('warns in production', checkMissingOpts.bind(null, mockOptsProd));
    });
  });

  describe('create method', () => {
    describe('Valid config returns with expected keys', () => {
      it('in development', clientCreate.bind(null, mockOptsDev.toObject()));
      it('in production', clientCreate.bind(null, mockOptsProd.toObject()));
    });
  })
});
