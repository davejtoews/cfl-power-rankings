import React from 'react';
import TeamSelect from './TeamSelect';
import NewWeek from './NewWeek';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {
			teams: []
		};
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	},
	render: function () {
		var year = (this.props.week) ? this.props.week.year.year : ''
		return(
			<div>
				<ul>
					<li>Year: {year}</li>
					<li>Week: {this.props.week.name}</li>
					<li>User: {this.props.username}</li>
				</ul>
				<NewWeek
					currentWeek={this.props.week}
					setWeek={this.props.setWeek}
					weekConfig={this.props.weekConfig}
				/>
				<TeamSelect 
					teams={this.state.teams} 
					userId={this.props.userId} 
					userTeam={this.props.userTeam}
				/>
			</div>

		);
	}
});