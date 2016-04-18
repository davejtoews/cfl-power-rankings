'use strict';

const service = require('feathers-mongoose');
const year = require('./year-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: year,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/years', service(options));

  // Get our initialize service to that we can bind hooks
  const yearService = app.service('/years');

  // Set up our before hooks
  yearService.before(hooks.before);

  // Set up our after hooks
  yearService.after(hooks.after);
};
