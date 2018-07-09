import PropTypes from 'prop-types';
import React from 'react';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    handleClick = (e) => {
		if (this.context.login) {
			e.preventDefault();
			this.context.feathersApp.logout().then(function(result){
			  console.log('Logged out!', result );
			  window.location.reload();
			}).catch(function(error){
			  console.error('Error logging out!', error);
			});
		}
	};

    render() {
		var url = this.context.login ? '/' : '/auth/reddit';
		var text = this.context.login ? 'Logout' : 'Login';
		return(
			<a href={ url } className="button login" onClick={ this.handleClick }>{ text }</a>
		);
	}
};