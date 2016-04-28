import React from 'react';
import LoginButton from './LoginButton';
import Info from './Info';




module.exports = React.createClass({
	childContextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getChildContext: function() {
		return { 
			feathersApp: this.props.feathersApp,
			login: this.props.login
		}
	},
	getInitialState: function() {
		return {
			year: '',
			week: '',
		}
	},
	getInfo: function(currentWeekId) {
		var setInfo = this.setInfo;
		this.props.feathersApp.service('weeks').get(currentWeekId, {query: { $populate: 'year' }}).then(function(result){
			setInfo(result.name,result.year.year);
		});	
	},
	setInfo: function(week, year) {
		this.setState({
			week: week,
			year: year
		});	
	},
	componentDidMount: function() {
		if (this.props.login) {
			var getInfo = this.getInfo;
			this.props.feathersApp.service('configs').find({query: { name: 'current_week'}}).then(function(result){
				getInfo(result.data[0].value);
			});	
		}
	},
	render: function () {
		return(
			<div>
				<Info year={this.state.year} week={this.state.week} username={this.props.username} />
				<LoginButton />
			</div>

		);
	}
});



