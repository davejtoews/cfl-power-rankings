import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	handleClick: function(e) {
		if (this.context.login) {
			e.preventDefault();
			this.context.feathersApp.logout().then(function(result){
			  console.log('Logged out!', result );
			  window.location.reload();
			}).catch(function(error){
			  console.error('Error logging out!', error);
			});
		}
	},
	render: function () {
		var url = this.context.login ? '/' : '/auth/reddit';
		var text = this.context.login ? 'Logout' : 'Login';
		return(
			<a href={ url } className="button login" onClick={ this.handleClick }>{ text }</a>
		);
	}
});