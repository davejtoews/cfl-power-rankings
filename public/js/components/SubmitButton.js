import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	handleClick: function(evt) {
		if (this.context.login) {
			evt.preventDefault();
			this.context.feathersApp.service('teams').find().then(function(result){
				console.log(result);
			});
		}
	},
	render: function () {
		return(
			<a href="#" className="button" onClick={ this.handleClick }>Submit</a>
		);
	}
});