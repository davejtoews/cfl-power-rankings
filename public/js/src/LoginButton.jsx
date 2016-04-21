var React = require('react');

module.exports = React.createClass({
	handleClick: function(evt) {
		if (this.props.login) {
			evt.preventDefault();
			this.props.app.logout().then(function(result){
			  console.log('Logged out!', result );
			}).catch(function(error){
			  console.error('Error logging out!', error);
			});
		}
	},
	render: function () {
		var url = this.props.login ? '/' : '/auth/reddit';
		var text = this.props.login ? 'Logout' : 'Login';
		return(
			<a href={ url } className="button" onClick={ this.handleClick }>{ text }</a>
		);
	}
});