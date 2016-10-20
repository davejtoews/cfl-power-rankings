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
		console.log(e.target.value);
		this.setState({
			selectedTeam: e.target.value
		});
		this.setUserTeam();
		console.log('handle');
	},
	setTeam: function(team) {
		this.setState({
			selectedTeam: team
		})
	},
	setUserTeam: function (e) {
		var setTeam = this.setTeam;
		if (this.context.login && this.state.selectedTeam && this.props.userId) {
			this.context.feathersApp.service('users')
				.patch(this.props.userId, {team: e.target.value})
				.then(function(result){
					setTeam(result.team);
				}).catch(function(error){
					console.error('Error submitting rankings!', error);
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
