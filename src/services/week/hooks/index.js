'use strict';

const globalHooks = require('../../../hooks');
const auth = require('@feathersjs/authentication');
const {
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

exports.before = {
  all: [
    auth.hooks.authenticate('jwt'),
    queryWithCurrentUser()
  ],
  find: [],
  get: [],
  create: [
    globalHooks.isAdmin()
  ],
  update: [
    globalHooks.isAdmin()
  ],
  patch: [
    globalHooks.isAdmin()
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
