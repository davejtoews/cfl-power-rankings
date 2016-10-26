'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const service = require('feathers-mongoose');

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  create: [
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ]
};

exports.after = {
  all: [
    hooks.remove('password'),
    service.hooks.toObject({})
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
