import { expect } from 'chai';

import WebPacker from '../src';

describe('WebPacker', () => {

  describe('Configuration', () => {
    describe('when missing options', () => {
      it('should throw an error', () => {
        expect(() => new WebPacker()).to.throw(Error);
      });
    });

    describe('when options lacks a required key', () => {
      it('should throw an error for empty', () => {
        expect(() => new WebPacker({})).to.throw(Error);
      });
      it('should throw an error for missing entry', () => {
        expect(() => new WebPacker({output: {path: './'}})).to.throw(Error);
      });
      it('should throw an error for missing output', () => {
        expect(() => new WebPacker({entry: []})).to.throw(Error);
      });
    });

    describe('when options.output lacks a required key', () => {
      it('should throw an error for no keys', () => {
        expect(() => new WebPacker({
          entry:  [],
          output: {}
        })).to.throw(Error);
      });

      it('should throw an error for a null output.path value', () => {
        expect(() => new WebPacker({
          entry:  [],
          output: {
            path: null
          }
        })).to.throw(Error);
      });
    });
  });

  describe('Output', () => {
    describe('Supplied with valid parameters', () => {
      it('return an object with expected keys', () => {
        let options = {
          entry:  [],
          output: {
            path: './'
          }
        };

        let config = new WebPacker(options, 'js', 'css', '../sass');

        expect(config).to.include.keys('entry', 'output', 'module', 'plugins', 'resolve', 'postcss');
      });
    });
  });
});

