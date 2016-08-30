import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	handleClick: function(evt) {
		if (this.context.login) {
			evt.preventDefault();
			this.props.getRankings();
		}
	},
	render: function () {
		return(
			<a href="#" className="button" onClick={ this.handleClick }>Results</a>
		);
	}
});