import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {
			submission: {
				user: this.props.userId,
				ranks: [],
				week: '',
				blurb: ''		
			},
			submitted: this.props.submitted,
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			submission: {
				user: this.props.userId,
				ranks: this.getRankList(nextProps.teams),
				week: nextProps.weekId,
				blurb: nextProps.blurb
			},
			submitted: nextProps.submitted
		});	
	},
	getRankList : function(teams) {
		return teams.map(function(team) {
			return team._id;
		});
	},
	handleClick: function(e) {
		e.preventDefault();
		var setSubmitted = this.props.setSubmitted;
		var setNotifications = this.props.setNotifications;
		if (this.context.login && this.state.submission.ranks.length  && this.state.submission.week) {
			if (this.state.submitted) {
				this.context.feathersApp.service('rankings').patch(this.state.submitted, this.state.submission).then(function(result){
					setNotifications('success', 'Rankings updated.');
				}).catch(function(error){
					console.error('Error updating rankings!', error);
					setNotifications('error', 'Error updating rankings.');
				});
			} else {
				this.context.feathersApp.service('rankings').create(this.state.submission).then(function(result){
					setSubmitted(result._id);
					setNotifications('success', 'Rankings submitted.');
				}).catch(function(error){
					console.error('Error submitting rankings!', error);
					setNotifications('error', 'Error submitting rankings.');
				});				
			}
		}
	},
	render: function () {
		var text = (this.state.submitted) ? 'Update' : 'Submit';
		return(
			<a href="#" className="button" onClick={ this.handleClick }>{text}</a>
		);
	}
});