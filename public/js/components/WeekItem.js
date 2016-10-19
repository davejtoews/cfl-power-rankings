import React from 'react';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return({
			rankings: '',
			rankers: []
		});
	},
	setRankings: function(rankings) {
		this.setState({
			rankings: rankings
		});
	},
	addRanker: function(ranker) {
		var rankers = this.state.rankers;
		rankers.push(ranker);
		this.setState({
			rankers: rankers
		})
	},
	componentDidMount: function() {
		var setRankings = this.setRankings;
		var addRanker = this.addRanker;
		var context = this.context;
		context.feathersApp.service('rankings').find({query: { week: this.props.id }}).then(function(result){
			result.data.forEach(function(ranking){
				context.feathersApp.service('users').get(ranking.user, {query: { $populate: 'team' }}).then(function(result){
					addRanker(result);
				}).catch(function(error){
					console.error('Error getting user', error);
				});
			});
			setRankings(result.total);
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	},
	render: function() {
		return(
			<li>
				Week: {this.props.name} Rankings: {this.state.rankings}
				<ul>
					{this.state.rankers.map(function(ranker, key){
						return (
							<li key={key} >{ranker.reddit.name}: {ranker.team.nickname}</li>
						);
					})}
				</ul>
			</li>
		);
	}
});