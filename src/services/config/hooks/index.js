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
  create: [],
  update: [],
  patch: [],
  remove: []
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
