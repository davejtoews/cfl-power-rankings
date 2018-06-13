'use strict';

const service = require('feathers-mongoose');
const config = require('./config-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: config,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/configs', service(options));

  // Get our initialize service to that we can bind hooks
  const configService = app.service('configs');

  configService.hooks(hooks);
};
