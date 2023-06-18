import PropTypes from 'prop-types';
import React from 'react';
import ResultsButton from './ResultsButton';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        results: {results: [], count: 0},
        markDown: '',
        records: [],
        lastWeekName: '',
        lastWeekResults: []
    };

    componentDidMount() {
		this.getStandings();
	}

	getRankings = () => {
		var setRankings = this.setRankings;
		var getLastWeekRankings = this.getLastWeekRankings;
		this.context.feathersApp.service('rankings').find({query: { week: this.props.weekId, $populate: ['ranks', 'user']}}).then(function(result){
			setRankings(result.data);
			getLastWeekRankings();
		}).catch(function(error){
				console.error('Error getting this week\'s rankings!', error);
		});
	};

	getLastWeekRankings = () => {
		var lastWeekName = this.state.lastWeekName;
		var currentYearId = this.props.yearId;
		var setLastWeekResults = this.setLastWeekResults;
		var context = this.context;
		if (lastWeekName) {
			context.feathersApp.service('weeks').find({query: { name: lastWeekName, year: currentYearId }}).then(function(result){
				context.feathersApp.service('rankings').find({query: { week: result.data[0]._id, $populate: ['ranks', 'user']}}).then(function(result){
					setLastWeekResults(result.data);
				}).catch(function(error){
						console.error('Error getting last week\'s rankings!', error);
				});
			}).catch(function(error){
					console.error('Error getting last week!', error);
			});
		}
	};

	getStandings = () => {
		var setRecords = this.setRecords;
		this.context.feathersApp.io.on('cflStandings', function(records){
			setRecords(records);
		});
		this.context.feathersApp.io.emit('cflStandings');
	};

	setRecords = (records) => {
		this.setState({
			records: records
		});
	};

	setLastWeekResults = (rankings) => {
		var count = rankings.length;
		var results = this.state.results;
		this.setState({
			lastWeekResults: this.tabulateRankings(rankings, count)
		});
		this.setState({
			markDown: this.createMarkDown(results)
		})
	};

	setRankings = (rankings) => {
		var count = rankings.length;
		var results = this.tabulateRankings(rankings, count);
		this.setState({
			results: results,
			markDown: this.createMarkDown(results)
		});
	};

	tabulateRankings = (rankings, count) => {
		var results = {};
		var teams = [];
		var nuetral = '';
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
				if (results.hasOwnProperty(ranking.user.team)) {
					results[ranking.user.team]['blurb'] = ranking.blurb;
				} else {
					nuetral = ranking.blurb;
				}
			}
		});
		var resultArray = Object.keys(results).map(key => results[key]);
		var sortedResults = this.sortResults(resultArray);
		var rankedResults = this.rankResults(sortedResults);
		return {results: rankedResults, count: count, nuetral: nuetral};
	};

	sortResults = (results) => {
		return results.sort(function(a, b){
			if (a.points < b.points) {
				return -1;
			}
			if (a.points > b.points) {
				return 1;
			}
			return 0;
		});
	};

	rankResults = (results) => {
		for(var i = 0; i < results.length; i++ ) {
			if (typeof results[i].tie === 'undefined') {
				results[i].rank = i + 1;
			} else {
				results[i].rank = results[i].tie
			}
			if (i < results.length - 1 && results[i].points === results[i + 1].points) {
				results[i].tie = results[i].rank;
				results[i + 1].tie = results[i].rank;
			}
		}
		return results;
	};

	getDelta = (thisWeekResult) => {
		var thisWeekRank = thisWeekResult.rank;
		var lastWeekRank;

		this.state.lastWeekResults.results.forEach(function(result, index) {
			if (result.cflId == thisWeekResult.cflId) {
				lastWeekRank = result.rank;
			}
		});

		return lastWeekRank - thisWeekRank;
	};

	createMarkDown = (results) => {
		var tableHead = "Rank| |Team|Δ|Record|Avg\n";
			tableHead += "-:|-|-|-|-|-\n";
		var tableRows = results.results.map(function(result, key) {
			var delta = 0;
			if(this.state.lastWeekResults.count) {
				delta = this.getDelta(result);
			}
			var average = Math.round(result.points / results.count * 100) / 100;
			var blurb = (result.blurb) ? result.blurb.replace(/\n/g, "") : '';
			var tie = (typeof result.tie === 'undefined') ? '' : 'T';
			return result.rank + tie + "|" + result.flair + "|" + result.location + "|" + delta + "|" + this.state.records[result.cflId] + "|"+ average + "\n";
    }.bind(this));
    var blurbList = results.results.map(function (result, key) {
      var blurb = (result.blurb) ? result.blurb.replace(/\n/g, "") : '';
      return '1. **' + result.location + ":** " + blurb + "\n";
    }.bind(this));
    var tableBody = tableRows.join('');
    var blurbs = blurbList.join('');
		var tableFoot = results.nuetral ? "Arphs summary: \n" + results.nuetral + "\n" : "";
		return tableHead + tableBody + "\n" + blurbs + "\n" + tableFoot;
	};

	handleChange = (e) => {
		this.setState({
			lastWeekName: e.target.value
		});
	};

	render() {
		return(
			<aside>
				<textarea rows="15" cols="75" value={this.state.markDown} />
				<form className="results-form">
					<label htmlFor="last-week-name">Last Week</label>
					<input name="last-week-name" id="last-week-name" type="text" value={this.state.lastWeekName} onChange={this.handleChange} />
					<ResultsButton getRankings={this.getRankings} />
				</form>
				<ul>
					{this.state.results.results.map(function(result, key){
						return (
							<li key={key} >{result.location}:{result.points}</li>
						);
					})}
				</ul>

			</aside>
		);
	}
};
