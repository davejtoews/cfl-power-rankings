'use strict';

const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const oauth1 = require('@feathersjs/authentication-oauth1');
const oauth2 = require('@feathersjs/authentication-oauth2');
const memory = require('feathers-memory');
const cookieParser = require('cookie-parser');

const RedditStrategy = require('passport-reddit').Strategy;

module.exports = function() {
  const app = this;

	app.configure(auth(app.get('auth')))
		.configure(jwt())
		.configure(local())
		//.configure(oauth1({
		//  name: 'reddit', // if the name differs from your config key you need to pass your config options explicitly
		//  Strategy: RedditStrategy
		//}))
		.configure(oauth2({
		  name: 'reddit', // if the name differs from your config key you need to pass your config options explicitly
		  Strategy: RedditStrategy
		}))
		.use('/users', memory());

	// Authenticate the user using the a JWT or
	// email/password strategy and if successful
	// return a new JWT access token.
	app.service('authentication').hooks({
	  before: {
	    create: [
	    	cookieParser(),
	      auth.hooks.authenticate(['jwt', 'local'])
	    ]
	  }
	});

  //let config = app.get('auth');
  //
  //config.reddit.strategy = RedditStrategy;
  //config.reddit.tokenStrategy = RedditTokenStrategy;

  //app.set('auth', config);
  //app.configure(authentication(config));
};
