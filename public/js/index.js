import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// Set up socket.io
var host = 'http://localhost:3030';
var socket = io(host);

// Set up Feathers client side
var feathersApp = feathers()
.configure(feathers.socketio(socket))
.configure(feathers.hooks())
.configure(feathers.authentication({ storage: window.localStorage }));

// Authenticating using a token
feathersApp.authenticate().then(function(result){
  console.log('Authenticated!', feathersApp.get('token'));
  renderApp(true);
}).catch(function(error){
  console.error('Error authenticating!', error);
  renderApp(false);
});

// Set up socket.io
var host = 'http://localhost:3030';
var socket = io(host);

function renderApp(login) {
	render(
		<App feathersApp={ feathersApp } login={ login } />
		,
	  	document.getElementById('App')
	);	
}