import mockFS from 'mock-fs';
import { AssertionError } from 'assert';
import { Map } from 'immutable';
import { expect } from 'chai';

import Packer from '../src';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001'
};

const mockPackerOpts = Map({
  devServer:   mockDevServer,
  resolveRoot: '/path/to/web_modules',
  appDir:      '/path/to/web_modules/js/apps',
  srcs:        {
    js:   '/path/to/web_modules/js',
    sass: '/path/to/web_modules/sass'
  },
  urls:        {
    js:  'js',
    css: 'css'
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

describe('Packer', () => {
  describe('dev', () => {
    const devOpts = mockPackerOpts.set('isProd', false);

    it('rejects invalid paths for resolveRoot', () => {
      mockFS(mockTree);
      expect(() => new Packer(devOpts.set('resolveRoot', '/path/to/missing_modules').toObject())).to.throw(Error);
      mockFS.restore();
    });

    it('produces the expected members with a valid config', () => {
      mockFS(mockTree);
      let p = new Packer(devOpts.toObject());
      expect(p).to.have.all.keys(['ssr', 'client', 'dev']);
      mockFS.restore();
    });
  });
});

