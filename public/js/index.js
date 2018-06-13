import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Config from './config.js';

// Set up socket.io
var host = Config.host;
var socket = io(host);

// Set up Feathers client side
var feathersApp = feathers()
.configure(feathers.socketio(socket))
//.configure(feathers.hooks())
.configure(feathers.authentication({ storage: window.localStorage }));

// Authenticating using a token
feathersApp.authenticate()
.then(response => {
  console.log('Authenticated!', response);
  // By this point your accessToken has been stored in
  // localstorage
  return app.passport.verifyJWT(response.accessToken);
})
.then(payload => {
  console.log('JWT Payload', payload);
  return app.service('users').get(payload.userId);
})
.then(user => {
  app.set('user', user);
  console.log('User', app.get('user'));
  // Do whatever you want now
  renderApp(true, result.data.reddit.name, result.data._id, result.data.team, result.data.admin);
})
.catch(function(error){
  console.error('Error authenticating!', error);
  renderApp(false,'unknown');
});

function renderApp(login, username, userId, userTeam, admin ) {
	render(
		<App feathersApp={ feathersApp } login={ login } username= { username } userId={userId} userTeam={userTeam} admin={admin} />
		,
	  	document.getElementById('App')
	);	
}