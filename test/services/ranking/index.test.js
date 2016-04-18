'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('ranking service', function() {
  it('registered the rankings service', () => {
    assert.ok(app.service('rankings'));
  });
});
