'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('week service', function() {
  it('registered the weeks service', () => {
    assert.ok(app.service('weeks'));
  });
});
