import { expect } from 'chai';
import mockFS from 'mock-fs';

import {
  getNestedEntries,
  getEntries
  } from '../../src/utils/getEntries';

let host = 'http://localhost:4001';

describe('utils/getEntries', () => {

  // Multiple entrypoints from directory contents
  //-----------------------------------------------
  describe('getEntriesMulti', () => {

    // Includes .DS_Store as a non-directory child of fakeDir
    const fakeTree = {
      'src/apps': {
        '.DS_Store': 'stuff',
        page1: {
          'entry.jsx': ''
        },
        page2: {
          'entry.jsx': ''
        },
        page3: {
          'entry.jsx': ''
        }
      }
    };

    const fakeRoot = Object.keys(fakeTree)[0];

    let baseOutput = {
      page1: 'src/apps/page1/entry.jsx',
      page2: 'src/apps/page2/entry.jsx',
      page3: 'src/apps/page3/entry.jsx'
    };

    describe('Config checks', () => {
      it('Rejects invalid paths', () => {
        let badRoot = 'src/apps/bogus';
        mockFS(fakeTree);
        expect(() => getNestedEntries(badRoot)).to.throw(Error);
        mockFS.restore();
      });
    });

    describe('No host specified', () => {
      it('returns a map of nested directories', () => {
        mockFS(fakeTree);
        expect(getNestedEntries(fakeRoot)).to.deep.equal(baseOutput);
        mockFS.restore();
      });
    });

    describe('Custom entry file', () => {
      it('Allows a custom entry file to be specified', () => {
        let customTree = {
          'src/apps': {
            '.DS_Store': 'stuff',
            page1: {
              'customEntry.js': ''
            },
            page2: {
              'customEntry.js': ''
            },
            page3: {
              'customEntry.js': ''
            }
          }
        };

        let customRoot = Object.keys(customTree)[0];
        let customEntry = `customEntry.js`;
        let customOutput = {
          page1: `src/apps/page1/${customEntry}`,
          page2: `src/apps/page2/${customEntry}`,
          page3: `src/apps/page3/${customEntry}`
        };

        mockFS(customTree);
        expect(getNestedEntries(customRoot, customEntry)).to.deep.equal(customOutput);
        mockFS.restore();
      });
    });
  });

  // Bundled entrypoints
  //-----------------------------------------------
  describe('getEntries', () => {
    // Includes .DS_Store as a non-directory child of fakeDir
    const fakeTree = {
      'src/apps': {
        '.DS_Store': 'stuff',
        'page1.js': '',
        'page2.js': '',
        'page3.js': ''
      }
    };

    const fakeRoot = Object.keys(fakeTree)[0];

    let baseOutput = {
      main: [
        'src/apps/page1.js',
        'src/apps/page2.js',
        'src/apps/page3.js'
      ]
    };

    describe('Config checks', () => {
      it('Rejects invalid paths', () => {
        let badRoot = 'src/bogus';
        mockFS(fakeTree);
        expect(() => getEntries(badRoot)).to.throw(Error);
        mockFS.restore();
      });
    });

    describe('No host specified', () => {
      it('Returns an object with a single key `main`', () => {
        mockFS(fakeTree);
        expect(getEntries(fakeRoot)).to.deep.equal(baseOutput);
        mockFS.restore();
      });
    });

    describe('Host specified', () => {
      it('Adds hot loader plugins when a host is specified', () => {
        mockFS(fakeTree);

        let entries = getEntries(fakeRoot, '.js', 'main');
        let output  = JSON.parse(JSON.stringify(baseOutput));

        expect(entries).to.deep.equal(output);
        mockFS.restore();
      });
    });

    describe('Custom extension', () => {
      it('Finds files', () => {
        let customTree = {
          'src/apps': {
            '.DS_Store': 'stuff',
            'page1.jsx': '',
            'page2.jsx': '',
            'page3.jsx': ''
          }
        };

        let customOutput = {
          main: [
            'src/apps/page1.jsx',
            'src/apps/page2.jsx',
            'src/apps/page3.jsx'
          ]
        };

        mockFS(customTree);
        expect(getEntries(fakeRoot, '.jsx')).to.deep.equal(customOutput);
        mockFS.restore();
      });
    });

    describe('Custom key', () => {
      it('Outputs the correct key', () => {
        let customOutput = {
          foo: [
            'src/apps/page1.js',
            'src/apps/page2.js',
            'src/apps/page3.js'
          ]
        };

        mockFS(fakeTree);
        expect(getEntries(fakeRoot, '.js', 'foo')).to.deep.equal(customOutput);
        mockFS.restore();
      });
    });
  });
});
