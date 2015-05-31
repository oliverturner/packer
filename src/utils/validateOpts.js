import assert from 'assert';
import fs from 'fs';
import {Map} from 'immutable';

// Check that options are present and valid
function validateOpts (reqs, options) {
  assert(options, 'No options supplied');

  // Loop over the reqs object and apply constraints: type, valid path, etc.
  Object.keys(reqs).forEach(key => {
    let option = options[key];
    let req    = reqs[key];

    assert(typeof option !== 'undefined', `${key} must be supplied`);

    if (req.type) {
      assert(typeof option === req.type, `${key} must be of type ${req.type} not ${typeof option}`);
    }

    if (req.props) {
      if (Map.isMap(option)) {
        req.props.forEach(prop => assert(option.has(prop), `${key}.${prop} must be supplied`));
      }
      else {
        req.props.forEach(prop => assert(typeof option[prop] !== 'undefined', `${key}.${prop} must be supplied`));
      }
    }

    if (req.path) {
      assert(fs.statSync(option).isDirectory(), `${key} must be a valid directory`);
    }
  });
}

export default validateOpts;
