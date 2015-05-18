import { expect } from 'chai';
import mock from 'mock-fs';

import getPlugins from '../src/utils/getPlugins';

describe('utils/getPlugins', () => {
  describe('Output', () => {
    it('returns an array', () => {
      console.log(getPlugins(false, '', ''));

      expect(getPlugins(false, '', '')).to.be.an.instanceOf(Array);
    });
  });
});
