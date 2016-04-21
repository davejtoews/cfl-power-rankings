'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('config service', function() {
  it('registered the configs service', () => {
    assert.ok(app.service('configs'));
  });
});
