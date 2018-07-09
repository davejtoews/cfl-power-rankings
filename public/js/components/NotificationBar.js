import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        type: false,
        message: '',
        time: 0,
        clear: false
    };

    componentWillReceiveProps(nextProps) {
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
	}

    setNotifications = (type, message, time) => {
		this.setState({
			type: type,
			message: message,
			time: time,
			clear: false			
		})
	};

    resetNotifications = () => {
		this.setState({
			clear: 'reset',
			type: false
		})
	};

    render() {
		var typeClass = (this.state.type) ? this.state.type + ' ' : '';
		var clearClass = (this.state.clear) ? this.state.clear : '';
		var notificationClasses = classNames('notification-bar ' + typeClass + clearClass);
		return(
			<p className={notificationClasses}>
				{this.state.message}
			</p>
		);
	}
};