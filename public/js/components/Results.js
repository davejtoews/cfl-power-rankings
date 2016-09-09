import React from 'react';
import ResultsButton from './ResultsButton';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {results: []}
	},
	getRankings: function () {
		var tabulateRankings = this.tabulateRankings;
		this.context.feathersApp.service('rankings').find({query: { week: this.props.weekId, $populate: ['ranks', 'user']}}).then(function(result){
			tabulateRankings(result.data)
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	},
	tabulateRankings: function(rankings) {
		var results = {};
		var teams = [];
		rankings.forEach(function(ranking) {
			if (!teams.includes(ranking.user.team)) {
				teams.push(ranking.user.team);
				ranking.ranks.forEach(function(rank, index) {
					if (results[rank._id]) {
						results[rank._id]['points'] = results[rank._id]['points'] + index;
					} else {
						results[rank._id] = {
							'points' : index,
							'name' : rank.name
						}					
					}

				});
			}
		});
		var resultArray = Object.keys(results).map(key => results[key]);
		var sortedResults = resultArray.sort(function(a, b){
			if (a.points < b.points) {
				return -1;
			}
			if (a.points > b.points) {
				return 1;
			}
			return 0;
		});

		this.setState({
			results: sortedResults
		});
	},
	render: function () {
		return(
			<div>
				<ResultsButton getRankings={this.getRankings} />
				<ul>
					{this.state.results.map(function(result, key){

						return (
							<li key={key} >{result.name}:{result.points}</li>
						);
					})}
				</ul>
			</div>
		);
	}
});