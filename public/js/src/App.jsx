var React = require('react');
var ReactDOM = require('react-dom');
var LoginButton = require('./LoginButton.jsx');

// Set up socket.io
var host = 'http://localhost:3030';
var socket = io(host);

// Set up Feathers client side
var app = feathers()
.configure(feathers.socketio(socket))
.configure(feathers.hooks())
.configure(feathers.authentication({ storage: window.localStorage }));

// Authenticating using a token
app.authenticate().then(function(result){
  console.log('Authenticated!', app.get('token'));
  renderApp(true);
}).catch(function(error){
  console.error('Error authenticating!', error);
  renderApp(false);
});

function renderApp(login) {
	ReactDOM.render(
	  <LoginButton
	  	login = {login}
	  	app = {app}
	  />,
	  document.getElementById('App')
	);	
}

