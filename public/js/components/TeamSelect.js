import React from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {
			teams: [],
			selectedTeam: this.props.userTeam
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	},
	handleChange: function (e) {
		this.setState({
			selectedTeam: e.target.value
		});
		this.setUserTeam();
	},
	setTeam: function(team) {
		this.setState({
			selectedTeam: team
		})
	},
	setUserTeam: function (e) {
		var setTeam = this.setTeam;
		var setNotifications = this.props.setNotifications;
		if (this.context.login && this.props.userId) {
			this.context.feathersApp.service('users')
				.patch(this.props.userId, {team: e.target.value})
				.then(function(result){
					setTeam(result.team);
					setNotifications('success', 'Team selection changed.');
				}).catch(function(error){
					console.error('Error selecting team!', error);
					setNotifications('error', 'Problem selecting team.');
				});
		}
	},
	render: function () {
		return(
			<select className="team-select" onChange={this.setUserTeam} value={this.state.selectedTeam}>
		        {this.state.teams.map(function(team, i) {
					return (
						<option 
							key={i}
							value={team._id}
						>{team.location}</option>
					)
				}, this)}
			</select>
		);
	}
});
