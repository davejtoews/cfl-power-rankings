import React from 'react';
import WeekItem from './WeekItem';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return({
			weeks: []
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var setWeeks = this.setWeeks;
		if (nextProps.yearId) {
			this.context.feathersApp.service('weeks').find({query: { year: nextProps.yearId}}).then(function(result){
				setWeeks(result.data);
			}).catch(function(error){
				console.error('Error adding week!', error);
			});			
		}
	},
	setWeeks: function(weeks) {
		setState({
			weeks: weeks
		});
	},
	render: function () {
		return(
			<ul>
		        {this.state.weeks.map(function(week, i) {
					return (
						<WeekItem week={week} />
					)
				}, this)}
			</ul>
		);
	}
});