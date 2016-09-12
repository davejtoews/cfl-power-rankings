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
			year: '',
			week: '',
			weekId: '',
			teams: []
		}
	},
	getInfo: function(currentWeekId) {
		var setInfo = this.setInfo;
		this.setState({
			weekId: currentWeekId
		});	
		this.props.feathersApp.service('weeks').get(currentWeekId, {query: { $populate: 'year' }}).then(function(result){
			setInfo(result.name, result.year.year);
		});
		this.props.feathersApp.service('rankings').find({query: {user: this.props.userId, week: currentWeekId}}).then(function(result) {
			console.log(result);
		});

	},
	setInfo: function(week, year) {
		this.setState({
			week: week,
			year: year
		});	
	},
	setTeams: function(teams) {
		this.setState({
			teams: teams
		});
	},
	componentDidMount: function() {
		if (this.props.login) {
			var getInfo = this.getInfo;
			var setTeams = this.setTeams;
			var setState = this.setState;
			this.props.feathersApp.service('configs').find({query: { name: 'current_week'}}).then(function(result){
				getInfo(result.data[0].value);
			});
			this.props.feathersApp.service('teams').find().then(function(result){
				setTeams(result.data);
			});
		}
	},
	render: function () {
		return(
			<div>
				<LoginButton />
				<Info 
					teams={this.state.teams} 
					year={this.state.year} 
					week={this.state.week} 
					username={this.props.username} 
					userId={this.props.userId} 
					userTeam={this.props.userTeam}
				/>
				<TeamList 
					teams={this.state.teams} 
					setTeams={this.setTeams} 
				/>
				<SubmitButton 
					teams={this.state.teams}
					weekId={this.state.weekId} 
					userId={this.props.userId} 
				/>
				<Results 
					weekId={this.state.weekId} 
				/>
			</div>

		);
	}
});



