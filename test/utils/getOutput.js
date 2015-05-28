import { expect } from 'chai';

import getOutput from '../../src/utils/getOutput';

describe('utils/getOutput', () => {
  let jsUrl = 'scripts';

  describe('using defaults', () => {
    let opts = {path: './'};
    let updated = {
      path:          './',
      publicPath:    '/',
      filename:      'scripts/[name].js',
      chunkFilename: 'scripts/[name].js'
    };

    it('should deeply equal `updated`', () => {
      expect(getOutput(jsUrl, opts)).to.deep.equal(updated);
    });
  });

  describe('specifying publicPath key', () => {
    let opts = {
      path:       './',
      publicPath: 'http://localhost:4001/'
    };

    let updated = {
      path:          './',
      publicPath:    'http://localhost:4001/',
      filename:      'scripts/[name].js',
      chunkFilename: 'scripts/[name].js'
    };

    it('should deeply equal `updated`', () => {
      expect(getOutput(jsUrl, opts)).to.deep.equal(updated);
    });
  });

  describe('missing path key', () => {
    let opts = {};

    it('should throw an error', () => {
      expect(() => getOutput(jsUrl, opts)).to.throw(Error);
    });
  });
});
