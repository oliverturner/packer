import { expect } from 'chai';

import getLoaders from '../src/utils/getLoaders';

describe('utils/getloaders', () => {

  describe('Output in dev mode', () => {
    let loaders = getLoaders();

    it('produces an array', () => {
      expect(loaders).to.be.an.instanceof(Array);
    });

    //it('creates objects with a key `test` and a value that is a RegExp', () => {
    //  loaders.forEach(loader => {
    //    expect(loader.test).to.be.an.instanceOf(RegExp)
    //  })
    //});
  });

  describe('Output in prod mode', () => {
    let loaders = getLoaders(true);

    it('produces an array', () => {
      expect(loaders).to.be.an.instanceof(Array);
    });

  });
});
