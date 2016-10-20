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
			records: [],
			lastWeekName: '',
			lastWeekResults: []
		}
	},
	componentDidMount: function() {
		this.getStandings();
	},
	getRankings: function () {
		var setRankings = this.setRankings;
		var getLastWeekRankings = this.getLastWeekRankings;
		this.context.feathersApp.service('rankings').find({query: { week: this.props.weekId, $populate: ['ranks', 'user']}}).then(function(result){
			setRankings(result.data);
			getLastWeekRankings();
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	},
	getLastWeekRankings: function() {
		var lastWeekName = this.state.lastWeekName;
		var setLastWeekResults = this.setLastWeekResults;
		var context = this.context;
		context.feathersApp.service('weeks').find({query: { name: lastWeekName }}).then(function(result){
			context.feathersApp.service('rankings').find({query: { week: result.data[0]._id, $populate: ['ranks', 'user']}}).then(function(result){
				setLastWeekResults(result.data);
			}).catch(function(error){
					console.error('Error getting last week\'s rankings!', error);
			});
		}).catch(function(error){
				console.error('Error getting last week!', error);
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
	setLastWeekResults: function(rankings) {
		var results = this.state.results;
		this.setState({
			lastWeekResults: this.tabulateRankings(rankings)
		});
		this.setState({
			markDown: this.createMarkDown(results)
		})
	},
	setRankings: function(rankings) {
		var results = this.tabulateRankings(rankings);
		this.setState({
			results: results,
			markDown: this.createMarkDown(results)
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

		return sortedResults;
	},
	getDelta: function(thisWeekResult) {
		var lastWeekResult;

		this.state.lastWeekResults.forEach(function(result) {
			if (result.cflId == thisWeekResult.cflId) {
				lastWeekResult = result;
			}
		});

		return thisWeekResult.points - lastWeekResult.points;
	},
	createMarkDown: function(results) {
		console.log('markdown');
		var tableHead = "Rank| |Team|Δ|Record|Avg|Comment\n";
			tableHead += "-:|-|-|-|-|-|-\n";
		var tableRows = results.map(function(result, key) {
			var delta = 0;
			if(this.state.lastWeekResults.length) {
				delta = this.getDelta(result);
			}	
			return (key + 1) + "|" + result.flair + "|" + result.location + "|" + delta + "|" + this.state.records[result.cflId] + "|"+ result.points +"|" + "\n";
		}.bind(this));
		var tableBody = tableRows.join('');
		return tableHead + tableBody;
	},
	handleChange: function(e) {
		this.setState({
			lastWeekName: e.target.value
		});
	},
	render: function () {
		return(
			<div>
				<input type="text" value={this.state.lastWeekName} onChange={this.handleChange} />
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