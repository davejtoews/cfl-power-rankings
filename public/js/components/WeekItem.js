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
		var rankers = this.state.rankers.slice();

		rankers.push(ranker);

		this.setState({
			rankers: rankers
		})
	},
	setRankers: function(rankers) {
		this.setState({
			rankers: rankers
		})
	},
	getRankings: function() {
		var setRankings = this.setRankings;
		var addRanker = this.addRanker;
		var context = this.context;
		var setRankers = this.setRankers;
		context.feathersApp.service('rankings').find({query: { week: this.props.id }}).then(function(result){
			var rankers = [];
			result.data.forEach(function(ranking, index, rankings){
				context.feathersApp.service('users').get(ranking.user, {query: { $populate: 'team' }}).then(function(result){
					rankers.push(result);
					setRankers(rankers);
				}).catch(function(error){
					console.error('Error getting user', error);
				});
			});
			setRankings(result.total);
		}).catch(function(error){
			console.error('Error getting this week\'s rankings!', error);
		});
	},
	componentDidMount: function() {
		this.getRankings();
	},
	componentWillReceiveProps: function(nextProps) {
		this.getRankings();
	},
	handleClick(e) {
		var week = this.props;
		var ranker = e.target.dataset.rankerId;
		var user = e.target.dataset.rankerName;
		var team = e.target.dataset.team;
		var setModalRanking = this.props.setModalRanking;
		this.context.feathersApp.service('rankings').find({query: { week: week.id, user:ranker, $populate: 'ranks' }}).then(function(result){
			setModalRanking({
				ranks: result.data[0].ranks,
				blurb: (result.data[0].blurb) ? result.data[0].blurb : '',
				user: user,
				team: team,
				week: week.name
			});
		}).catch(function(error){
			console.error('Error getting rankings!', error);
		});
	},
	render: function() {
		return(
			<li>
				<details>
					<summary>Week: {this.props.name} Rankings: {this.state.rankings}</summary>
					<ul>
						{this.state.rankers.map(function(ranker, key){
							return (
								<li key={key} >
									<a 
										href="#"
										data-ranker-id={ranker._id}
										data-ranker-name={ranker.reddit.name}
										data-team={ranker.team.nickname}
										onClick={this.handleClick}>
										{ranker.reddit.name}: {ranker.team.nickname}
									</a>
								</li>
							);
						}, (this))}
					</ul>
				</details>
			</li>
		);
	}
});