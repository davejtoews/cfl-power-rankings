'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const feathers = require('feathers');

const app = feathers();

var checkIfSubmitted = function(options) {
  return function(hook) {
    return this.find({query: {user: hook.data.user, week: hook.data.week}}).then(function(result){
      if (result.total) {
        throw new Error('Ranking already submitted.');
      }
    });
  };
};

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [
    globalHooks.isAdmin(),
    checkIfSubmitted()
  ],
  update: [
    globalHooks.isAdmin()
  ],
  patch: [
    globalHooks.isAdmin(),
  ],
  remove: [
    globalHooks.isAdmin()
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
