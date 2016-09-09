import React from 'react';
import TeamSelect from './TeamSelect';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {teams: []};
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	},
	render: function () {
		return(
			<div>
				<ul>
					<li>Year: {this.props.year}</li>
					<li>Week: {this.props.week}</li>
					<li>User: {this.props.username}</li>
				</ul>
				<TeamSelect teams={this.state.teams} userId={this.props.userId} userTeam={this.props.userTeam} />
			</div>

		);
	}
});