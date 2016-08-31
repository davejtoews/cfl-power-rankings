import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	handleClick: function(e) {
		if (this.context.login) {
			e.preventDefault();
			this.props.getRankings();
		}
	},
	render: function () {
		return(
			<a href="#" className="button" onClick={ this.handleClick }>Results</a>
		);
	}
});