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
	},
	setUserTeam: function (e) {
		e.preventDefault();
		var teamSelect = this;
		if (this.context.login && this.state.selectedTeam && this.props.userId) {
			this.context.feathersApp.service('users')
				.patch(this.props.userId, {team: this.state.selectedTeam})
				.then(function(result){
					console.log(result);
				}).catch(function(error){
					console.error('Error submitting rankings!', error);
				});
		}
	},
	render: function () {
		return(
			<form onSubmit={this.setUserTeam}>
				<select onChange={this.handleChange} value={this.state.selectedTeam}>
			        {this.state.teams.map(function(team, i) {
						return (
							<option 
								key={i}
								value={team._id}
							>{team.location}</option>
						)
					}, this)}
				</select>
				<input type="submit"/>
			</form>
		);
	}
});
