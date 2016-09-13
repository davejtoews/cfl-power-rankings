import React from 'react';
import TeamSelect from './TeamSelect';
import NewWeek from './NewWeek';
import WeekList from './WeekList';

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
		var year = (this.props.week) ? this.props.week.year.year : '';
		var yearId = (this.props.week) ? this.props.week.year._id : false;
		return(
			<div>
				<ul>
					<li>Year: {year}</li>
					<li>Week: {this.props.week.name}</li>
					<li>User: {this.props.username}</li>
				</ul>
				<TeamSelect 
					teams={this.state.teams} 
					userId={this.props.userId} 
					userTeam={this.props.userTeam}
				/>
				<WeekList yearId={yearId}/>
				<NewWeek
					currentWeek={this.props.week}
					setWeek={this.props.setWeek}
					weekConfig={this.props.weekConfig}
				/>
			</div>

		);
	}
});