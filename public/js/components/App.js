import React from 'react';
import LoginButton from './LoginButton';
import Info from './Info';
import TeamList from './TeamList';
import SubmitButton from './SubmitButton';
import Results from './Results';

module.exports = React.createClass({
	childContextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getChildContext: function() {
		return { 
			feathersApp: this.props.feathersApp,
			login: this.props.login
		}
	},
	getInitialState: function() {
		return {
			week: '',
			teams: [],
			weekConfig: ''
		}
	},
	getInfo: function(currentWeekId) {
		console.log(currentWeekId);
		var setWeek = this.setWeek;
		var setTeams = this.setTeams;
		var getTeams = this.getTeams;

		this.props.feathersApp.service('weeks').get(currentWeekId, {query: { $populate: 'year' }}).then(function(result){
			setWeek(result);
		});
		this.props.feathersApp.service('rankings').find({query: {user: this.props.userId, week: currentWeekId, $populate: 'ranks'}}).then(function(result) {
			if (result.total) {
				setTeams(result.data[0].ranks);
			} else {
				getTeams();
			}
		});

	},
	getTeams: function() {
		var setTeams = this.setTeams;
		this.props.feathersApp.service('teams').find().then(function(result){
			setTeams(result.data);
		});
	},
	setWeek: function(week) {
		if (typeof week.year == "string" && week.year == this.state.week.year._id) {
			week.year = this.state.week.year
		}
		// Another check will be necessary once year update is set up
		this.setState({
			week: week
		});	
	},
	setTeams: function(teams) {
		this.setState({
			teams: teams
		});
	},
	setWeekConfig: function(weekConfig) {
		this.setState({
			weekConfig: weekConfig
		});
	},
	componentDidMount: function() {
		if (this.props.login) {
			var getInfo = this.getInfo;
			var setWeekConfig = this.setWeekConfig;
			this.props.feathersApp.service('configs').find({query: { name: 'current_week'}}).then(function(result){
				setWeekConfig(result.data[0]._id);
				getInfo(result.data[0].value);
			});
		}
	},
	render: function () {
		return(
			<div>
				<LoginButton />
				<Info 
					teams={this.state.teams} 
					week={this.state.week} 
					username={this.props.username} 
					userId={this.props.userId} 
					userTeam={this.props.userTeam}
					setWeek={this.setWeek}
					weekConfig={this.state.weekConfig}
				/>
				<TeamList 
					teams={this.state.teams} 
					setTeams={this.setTeams} 
				/>
				<SubmitButton 
					teams={this.state.teams}
					weekId={this.state.week._id} 
					userId={this.props.userId} 
				/>
				<Results 
					weekId={this.state.week._id} 
				/>
			</div>

		);
	}
});



