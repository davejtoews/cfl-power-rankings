var app = require('./app.js');

var React = require('react');
var ReactDOM = require('react-dom');
var LoginButton = require('./LoginButton.jsx');

// Authenticating using a token
app.authenticate().then(function(result){
  console.log('Authenticated!', app.get('token'));
  renderApp(true);
}).catch(function(error){
  console.error('Error authenticating!', error);
  renderApp(false);
});

var Wrapper = React.createClass({
	getInitialState: function() {

	},
	componentDidMount: function() {
	
	},
	render: function () {
		return(
			<LoginButton
				app = {app}
			/>
		);
	}
});

function renderApp(login) {
	ReactDOM.render(
		<Wrapper />
		,
	  	document.getElementById('App')
	);	
}

