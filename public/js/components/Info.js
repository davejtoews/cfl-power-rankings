import React from 'react';

module.exports = React.createClass({
	render: function () {
		return(
			<ul>
				<li>Year: {this.props.year}</li>
				<li>Week: {this.props.week}</li>
				<li>User: {this.props.username}</li>
			</ul>
		);
	}
});