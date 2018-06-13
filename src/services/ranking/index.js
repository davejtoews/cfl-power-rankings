'use strict';

const service = require('feathers-mongoose');
const ranking = require('./ranking-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: ranking,
    paginate: {
      default: 9,
      max: 9
    }
  };

  // Initialize our service with any options it requires
  app.use('/rankings', service(options));

  // Get our initialize service to that we can bind hooks
  const rankingService = app.service('/rankings');

  rankingService.hooks(hooks);
};
