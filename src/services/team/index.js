'use strict';

const service = require('feathers-mongoose');
const team = require('./team-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: team,
    paginate: {
      default: 9,
      max: 9
    }
  };

  // Initialize our service with any options it requires
  app.use('/teams', service(options));

  // Get our initialize service to that we can bind hooks
  const teamService = app.service('/teams');

  teamService.hooks(hooks);
};
