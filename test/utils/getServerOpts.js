import { expect } from 'chai';

import { Map } from 'immutable';

import getServerOpts from '../../src/utils/getServerOpts';

describe('utils/getServerOpts', () => {
  describe('Configuration', () => {
    it('Throws on without options', () => {
      expect(() => getServerOpts({})).to.throw(Error);
    });

    it('Throws on receiving insufficient options', () => {
      expect(() => getServerOpts({})).to.throw(Error);
    });
  });

  describe('Returns', () => {
    let options = {
      host: 'localhost',
      port: 4001
    };

    it('Returns a Map', () => {
      expect(getServerOpts(options)).to.be.an.instanceOf(Map);
    });

    it('Generates the required keys from options', () => {
      expect(getServerOpts(options).toJS()).to.have.all.keys('host', 'port', 'url');
    });

    it('Creates the correct value for `url`', () => {
      expect(getServerOpts(options).get('url')).to.equal('http://localhost:4001');
    });
  });
});
