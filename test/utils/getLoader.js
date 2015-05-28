import { expect } from 'chai';

import getLoader from '../../src/utils/getLoader';

describe('utils/getloader', () => {

  describe('parse plain loader', () => {
    let loader = 'css';

    it('should add correct suffix', () => {
      expect(getLoader(loader)).to.equal('css-loader');
    });
  });

  describe('parse loader with arguments', () => {
    let sassPath = '../sass';
    let loader = 'sass?includePaths[]=' + sassPath;

    it('should add correct suffix', () => {
      let outcome = 'sass-loader?includePaths[]=../sass';
      expect(getLoader(loader)).to.equal(outcome);
    });
  });
});
