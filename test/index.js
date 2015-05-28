import { expect } from 'chai';

import Packer from '../src';

const mockDevServer = {
  host: 'localhost',
  port: '3001',
  url:  'http://localhost:3001'
};

const mockPackerOpts = {
  devServer:   mockDevServer,
  resolveRoot: '/web_modules',
  appDir:      '/web_modules/js/apps',
  srcs:        {
    js:   '/web_modules/js',
    sass: '/web_modules/sass'
  },
  urls:        {
    js: 'js'
  }
};

describe('WebPacker', () => {
  it('exports a statically accessible property utils', () => {
    expect(Packer.utils.getServerOpts).to.be.an.instanceof(Function);
  });

  describe('dev', () => {
    let packer = new Packer(mockPackerOpts);
  });
});

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

