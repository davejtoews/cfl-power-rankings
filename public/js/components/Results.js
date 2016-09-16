import React from 'react';
import ResultsButton from './ResultsButton';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return {
			results: [],
			markDown: '',
			records: []
		}
	},
	componentDidMount: function() {
		this.getStandings();
	},
	getRankings: function () {
		var tabulateRankings = this.tabulateRankings;
		this.context.feathersApp.service('rankings').find({query: { week: this.props.weekId, $populate: ['ranks', 'user']}}).then(function(result){
			tabulateRankings(result.data)
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	},
	getStandings: function() {
		var setRecords = this.setRecords;
		this.context.feathersApp.io.on('cflStandings', function(records){
			setRecords(records);
		});
		this.context.feathersApp.io.emit('cflStandings');
	},
	setRecords: function(records) {
		this.setState({
			records: records
		});
	},
	tabulateRankings: function(rankings) {
		var results = {};
		var teams = [];
		rankings.forEach(function(ranking) {
			if (!teams.includes(ranking.user.team)) {
				teams.push(ranking.user.team);
				ranking.ranks.forEach(function(rank, index) {
					var rating = index + 1;
					if (results[rank._id]) {
						results[rank._id]['points'] = results[rank._id]['points'] + rating;
					} else {
						results[rank._id] = {
							'points' : rating,
							'location' : rank.location,
							'cflId': rank.cflId,
							'flair': rank.flair
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
			results: sortedResults,
			markDown: this.createMarkDown(sortedResults)
		});
	},
	createMarkDown: function(results) {
		var tableHead = "Rank| |Team|Δ|Record|Avg|Comment\n";
			tableHead += "-:|-|-|-|-|-|-\n";
		var tableRows = results.map(function(result, key) {
			return (key + 1) + "|" + result.flair + "|" + result.location + "||" + this.state.records[result.cflId] + "|"+ result.points +"|" + "\n";
		}.bind(this));
		var tableBody = tableRows.join('');
		
		console.log(tableHead + tableBody);
		return tableHead + tableBody;
	},
	render: function () {
		return(
			<div>
				<ResultsButton getRankings={this.getRankings} />
				<ul>
					{this.state.results.map(function(result, key){
						return (
							<li key={key} >{result.location}:{result.points}</li>
						);
					})}
				</ul>
				<textarea rows="15" cols="75" value={this.state.markDown} />
			</div>
		);
	}
});