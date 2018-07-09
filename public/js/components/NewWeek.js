import PropTypes from 'prop-types';
import React from 'react';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = { newWeekName: '' };

    handleChange = (e) => {
		this.setState({
			newWeekName: e.target.value
		});
	};

    handleSubmit = (e) => {
		e.preventDefault();
		var updateCurrentWeek = this.updateCurrentWeek;
		var newWeek = {
			name: this.state.newWeekName,
			year: this.props.currentWeek.year
		}
		this.context.feathersApp.service('weeks').create(newWeek).then(function(result){
			updateCurrentWeek(result);
		}).catch(function(error){
			console.error('Error adding week!', error);
		});
	};

    updateCurrentWeek = (week) => {
		var setWeek = this.props.setWeek;
		var setNotifications = this.props.setNotifications;
		this.context.feathersApp.service('configs').patch(this.props.weekConfig, {value: week._id}).then(function(result){
			setWeek(week);
			setNotifications('success', 'Current week updated.');
		}).catch(function(error){
			console.error('Error updating current week!', error);
			setNotifications('error', 'Problem updating week.');
		});
	};

    render() {
		return(
			<form className="new-week-form" onSubmit={this.handleSubmit}>
				<label htmlFor="new-week-name">New Week</label>
				<input name="new-week-name" id="new-week-name" type="text" onChange={this.handleChange} value={this.state.newWeekName}/>
				<button type="submit">Update Week</button>
			</form>
		);
	}
};