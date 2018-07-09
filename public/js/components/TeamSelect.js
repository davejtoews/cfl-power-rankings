import PropTypes from 'prop-types';
import React from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        teams: [],
        selectedTeam: this.props.userTeam
    };

    componentWillReceiveProps(nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	}

    handleChange = (e) => {
		this.setState({
			selectedTeam: e.target.value
		});
		this.setUserTeam();
	};

    setTeam = (team) => {
		this.setState({
			selectedTeam: team
		})
	};

    setUserTeam = (e) => {
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
	};

    render() {
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
};
