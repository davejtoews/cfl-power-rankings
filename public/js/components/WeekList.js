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
				console.error('Error getting weeks!', error);
			});			
		}
	},
	setWeeks: function(weeks) {
		this.setState({
			weeks: weeks
		});
	},
	render: function () {
		console.log(this.state);
		return(
			<ul>
		        {this.state.weeks.map(function(week, i) {
					return (
						<WeekItem key={week._id} name={week.name} id={week._id} />
					)
				}, this)}
			</ul>
		);
	}
});