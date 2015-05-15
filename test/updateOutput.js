import { expect } from 'chai';

import updateOutput from '../src/utils/updateOutput';

describe('utils/updateOutput', () => {
  let jsUrl = 'scripts';

  describe('using defaults', () => {
    let opts = {path: './'};
    let updated = {
      path:          './',
      publicPath:    '/scripts/',
      filename:      'scripts/[name].js',
      chunkFilename: 'scripts/[name].js'
    };

    it('should deeply equal `updated`', () => {
      expect(updateOutput(opts, jsUrl)).to.deep.equal(updated);
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
      expect(updateOutput(opts, jsUrl)).to.deep.equal(updated);
    });
  });

  describe('missing path key', () => {
    let opts = {};

    it('should throw an error', () => {
      expect(() => updateOutput(opts, jsUrl)).to.throw(Error);
    });
  });
});
