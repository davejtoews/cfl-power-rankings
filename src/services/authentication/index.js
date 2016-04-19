'use strict';

const authentication = require('feathers-authentication');

const RedditStrategy = require('passport-reddit').Strategy;
const RedditTokenStrategy = require('passport-reddit-token');

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  
  config.reddit.strategy = RedditStrategy;
  config.reddit.tokenStrategy = RedditTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
