import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {
			user: this.props.userId,
			ranks: [],
			week: ''
		};
	},
	componentWillReceiveProps: function () {
		this.setState({
			ranks: this.getRankList(this.props.teams),
			week: this.props.weekId
		});	
	},
	getRankList : function(teams) {
		return teams.map(function(team) {
			return team._id;
		});
	},
	handleClick: function(evt) {
		evt.preventDefault();
		if (this.context.login && this.state.ranks.length  && this.state.week) {
			this.context.feathersApp.service('rankings').create(this.state).then(function(result){
				console.log(result);
			}).catch(function(error){
				console.error('Error submitting rankings!', error);
			});
		}
	},
	render: function () {
		return(
			<a href="#" className="button" onClick={ this.handleClick }>Submit</a>
		);
	}
});