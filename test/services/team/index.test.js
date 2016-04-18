'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('team service', function() {
  it('registered the teams service', () => {
    assert.ok(app.service('teams'));
  });
});
