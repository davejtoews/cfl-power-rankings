'use strict';
const ranking = require('./ranking');
const team = require('./team');
const week = require('./week');
const year = require('./year');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(year);
  app.configure(week);
  app.configure(team);
  app.configure(ranking);
};
