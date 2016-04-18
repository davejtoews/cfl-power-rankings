'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('year service', function() {
  it('registered the years service', () => {
    assert.ok(app.service('years'));
  });
});
