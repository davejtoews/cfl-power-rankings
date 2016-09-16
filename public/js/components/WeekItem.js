import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return({
			rankings: ''
		});
	},
	setRankings: function(rankings) {
		this.setState({
			rankings: rankings
		});
	},
	componentDidMount: function() {
		var setRankings = this.setRankings;
		this.context.feathersApp.service('rankings').find({query: { week: this.props.id }}).then(function(result){
			setRankings(result.total);
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	},
	render: function () {
		return(
			<li>Week: {this.props.name} Rankings: {this.state.rankings}</li>
		);
	}
});