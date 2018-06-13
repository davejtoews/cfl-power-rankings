'use strict';

const globalHooks = require('../../../hooks');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const service = require('feathers-mongoose');
const {
  queryWithCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

exports.before = {
  all: [],
  find: [
    auth.hooks.authenticate('jwt'),
    queryWithCurrentUser()
  ],
  get: [
    auth.hooks.authenticate('jwt'),
    queryWithCurrentUser()
  ],
  create: [
    local.hooks.hashPassword()
  ],
  update: [
    auth.hooks.authenticate('jwt'),
    restrictToOwner({ ownerField: '_id' })
  ],
  patch: [
    auth.hooks.authenticate('jwt'),
    restrictToOwner({ ownerField: '_id' })
  ],
  remove: [
    auth.hooks.authenticate('jwt'),
    restrictToOwner({ ownerField: '_id' })
  ]
};

exports.after = {
  all: [
    service.hooks.toObject({})
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
