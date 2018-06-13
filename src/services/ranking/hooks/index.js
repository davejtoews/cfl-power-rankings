'use strict';

const globalHooks = require('../../../hooks');
const auth = require('@feathersjs/authentication');
const feathers = require('@feathersjs/feathers');
const {
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

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
    auth.hooks.authenticate('jwt'),
    queryWithCurrentUser()
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
