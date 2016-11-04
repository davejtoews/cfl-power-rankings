import React from 'react';
import WeekItem from './WeekItem';
import RankingModal from './RankingModal';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return({
			weeks: [],
			modalRanking: {},
			modalOpen: false
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var setWeeks = this.setWeeks;
		if (nextProps.yearId) {
			this.context.feathersApp.service('weeks').find({query: { year: nextProps.yearId}}).then(function(result){
				setWeeks(result.data);
			}).catch(function(error){
				console.error('Error getting weeks!', error);
			});			
		}
	},
	setWeeks: function(weeks) {
		this.setState({
			weeks: weeks
		});
	},
	setModalRanking(ranking) {
		this.setState({
			modalRanking: ranking,
			modalOpen: true
		});
	},
	closeModal() {
		this.setState({
			modalOpen: false
		});
	},
	render: function () {
		return(
			<div className="week-list-wrapper">
				<ul>
			        {this.state.weeks.map(function(week, i) {
						return (
							<WeekItem key={week._id} name={week.name} id={week._id} setModalRanking={this.setModalRanking} />
						)
					}, this)}
				</ul>
				<RankingModal ranking={this.state.modalRanking} open={this.state.modalOpen} closeModal={this.closeModal} />	
			</div>
		);
	}
});