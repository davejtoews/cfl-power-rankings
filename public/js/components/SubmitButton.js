import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        submission: {
            user: this.props.userId,
            ranks: [],
            week: '',
            blurb: ''		
        },
        submitted: this.props.submitted,
        waiting: false
    };

    componentWillReceiveProps(nextProps) {
		this.setState({
			submission: {
				user: this.props.userId,
				ranks: this.getRankList(nextProps.rankedTeams),
				week: nextProps.weekId,
				blurb: nextProps.blurb
			},
			submitted: nextProps.submitted
		});	
	}

    setWaiting = (waiting) => {
		this.setState({
			waiting: waiting
		});
	};

    getRankList = (rankedTeams) => {
		return rankedTeams.map(function(team) {
			return team._id;
		});
	};

    handleClick = (e) => {
		e.preventDefault();
		var setSubmitted = this.props.setSubmitted;
		var setNotifications = this.props.setNotifications;
		var setWaiting = this.setWaiting;
		if (
			!this.state.waiting && 
			this.context.login && 
			this.state.submission.ranks.length && 
			this.state.submission.week
		) {
			setWaiting(true);
			if (this.state.submitted) {
				this.context.feathersApp.service('rankings').patch(this.state.submitted, this.state.submission).then(function(result){
					setNotifications('success', 'Rankings updated.');
					setWaiting(false);
				}).catch(function(error){
					console.error('Problem updating rankings!', error);
					setNotifications('error', 'Problem updating rankings. ' + error);
					setWaiting(false);
				});
			} else {
				this.context.feathersApp.service('rankings').create(this.state.submission).then(function(result){
					setSubmitted(result._id);
					setNotifications('success', 'Rankings submitted.');
					setWaiting(false);
				}).catch(function(error){
					console.error('Problem submitting rankings!', error);
					setNotifications('error', 'Problem submitting rankings. ' + error);
					setWaiting(false);
				});				
			}
		}
	};

    render() {
		var text = (this.state.submitted) ? 'Update' : 'Submit';
		var disabled = (this.state.waiting) ? 'disabled' : '';
		var buttonClasses = classNames('button ' + disabled);
		return(
			<a href="#" className={ buttonClasses } onClick={ this.handleClick }>{text}</a>
		);
	}
};