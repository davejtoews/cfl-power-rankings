import React from 'react';
import classNames from 'classnames';

module.exports = React.createClass({
	contextTypes: {
		feathersApp: React.PropTypes.object,
		login: React.PropTypes.bool
	},
	getInitialState: function() {
		return({
			type: false,
			message: '',
			time: 0,
			clear: false
		});
	},
	componentWillReceiveProps: function (nextProps) {
		var setNotifications = this.setNotifications;
		var resetNotifications = this.resetNotifications;

		if(this.state.time && this.state.time != nextProps.time) {
			this.setState({
				clear: 'clear'
			});
			setTimeout(function(){
				resetNotifications();
			}, 400)
			setTimeout(function(){
				setNotifications(nextProps.type, nextProps.message, nextProps.time);
			}, 800)			
		} else {
			setNotifications(nextProps.type, nextProps.message, nextProps.time);
		}
	},
	setNotifications: function (type, message, time) {
		this.setState({
			type: type,
			message: message,
			time: time,
			clear: false			
		})
	},
	resetNotifications: function () {
		this.setState({
			clear: 'reset',
			type: false
		})
	},
	render: function () {
		var typeClass = (this.state.type) ? this.state.type + ' ' : '';
		var clearClass = (this.state.clear) ? this.state.clear : '';
		var notificationClasses = classNames('notification-bar ' + typeClass + clearClass);
		return(
			<p className={notificationClasses}>
				{this.state.message}
			</p>
		);
	}
});