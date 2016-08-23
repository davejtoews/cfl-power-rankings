import React from 'react';
import LoginButton from './LoginButton';
//import Info from './Info';
//import TeamList from './TeamList';
import SortableList from './SortableList';

var data = {
  items: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue"
  ]
};

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
			teams: []
		}
	},
	getInfo: function(currentWeekId) {
		var setInfo = this.setInfo;
		this.props.feathersApp.service('weeks').get(currentWeekId, {query: { $populate: 'year' }}).then(function(result){
			setInfo(result.name,result.year.year);
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
				<Info year={this.state.year} week={this.state.week} username={this.props.username} />
				{/* <TeamList teams={this.state.teams} /> */}
				<SortableList data={data} />
				<LoginButton />
			</div>

		);
	}
});



