import React from 'react';
import LoginButton from './LoginButton';

module.exports = React.createClass({
	childContextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getChildContext: function() {
		return { 
			feathersApp: this.props.feathersApp,
			login: this.props.login
		};
	},
	render: function () {
		return(
			<LoginButton />
		);
	}
});



