import { expect } from 'chai';

import WebPacker from '../src';

//describe('WebPacker', () => {
//
//  describe('Configuration', () => {
//    describe('missing options', () => {
//      it('should throw an error', () => {
//        expect(() => new WebPacker()).to.throw(Error);
//      });
//    });
//
//    describe('options lacks a required key', () => {
//      it('should throw an error for empty', () => {
//        expect(() => new WebPacker({})).to.throw(Error);
//      });
//      it('should throw an error for missing entry', () => {
//        expect(() => new WebPacker({output: {path: './'}})).to.throw(Error);
//      });
//      it('should throw an error for missing output', () => {
//        expect(() => new WebPacker({entry: []})).to.throw(Error);
//      });
//    });
//
//    describe('options.output lacks a required key', () => {
//      it('should throw an error for no keys', () => {
//        expect(() => new WebPacker({
//          entry:  [],
//          output: {}
//        })).to.throw(Error);
//      });
//
//      it('should throw an error for a null output.path value', () => {
//        expect(() => new WebPacker({
//          entry:  [],
//          output: {
//            path: null
//          }
//        })).to.throw(Error);
//      });
//    });
//  });
//
//  describe('Output', () => {
//    describe('Supplied with valid parameters', () => {
//      it('should return an object with expected keys', () => {
//        let options = {
//          entry:   [],
//          output:  {
//            path: './'
//          },
//          module:  {},
//          plugins: []
//        };
//
//        let config = new WebPacker(options);
//
//        expect(config).to.include.keys('debug', 'devtool', 'entry', 'output', 'module', 'plugins', 'resolve');
//      });
//    });
//  });
//});

