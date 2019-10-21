'use strict';

const service = require('feathers-mongoose');
const week = require('./week-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: week,
    paginate: {
      default: 24,
      max: 24
    }
  };

  // Initialize our service with any options it requires
  app.use('/weeks', service(options));

  // Get our initialize service to that we can bind hooks
  const weekService = app.service('/weeks');

  // Set up our before hooks
  weekService.before(hooks.before);

  // Set up our after hooks
  weekService.after(hooks.after);
};
