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
			selectedTeam: ''
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
		console.log(this.props);
		console.log([this.context.login, this.state.selectedTeam , this.props.userId]);
		if (this.context.login && this.state.selectedTeam && this.props.userId) {
			console.log('yes');
			this.context.feathersApp.service('users')
				.update(this.props.userId, {team: this.state.selectedTeam})
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
				<select onChange={this.handleChange}>
			        {this.state.teams.map(function(team, i) {
						return (
							<option 
								key={i}
								value={team._id}
							>{team.name}</option>
						)
					}, this)}
				</select>
				<input type="submit"/>
			</form>
		);
	}
});
