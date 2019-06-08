import PropTypes from 'prop-types';
import React from 'react';
import LoginButton from './LoginButton';
import Info from './Info';
import TeamList from './TeamList';
import SubmitButton from './SubmitButton';
import Results from './Results';
import UserList from './UserList';
import NotificationBar from './NotificationBar';
import Blurb from './Blurb';

module.exports = class extends React.Component {
	static childContextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

	state = {
			week: '',
			teams: [],
			rankedTeams: [],
			weekConfig: '',
			submitted: false,
			notification: {
					type: false,
					message: '',
					time: 0
			}
	};

	getChildContext() {
		return { 
			feathersApp: this.props.feathersApp,
			login: this.props.login
		}
	}

	getInfo = (currentWeekId) => {
		var setWeek = this.setWeek;
		var setTeams = this.setTeams;
		var setRankedTeams = this.setRankedTeams;
		var getTeams = this.getTeams;
		var setSubmitted = this.setSubmitted;
		var setBlurb = this.setBlurb;
		var rankedTeams = this.state.rankedTeams;
		var feathersApp = this.props.feathersApp;

		feathersApp.service('weeks').get(currentWeekId, {query: { $populate: 'year' }}).then(function(result){
			setWeek(result);
		});
		feathersApp.service('rankings').find({query: {user: this.props.userId, week: currentWeekId, $populate: 'ranks'}}).then(function(result) {
			if (result.total) {
				setRankedTeams(result.data[0].ranks);
				setSubmitted(result.data[0]._id);
				setBlurb(result.data[0].blurb);
			} else {
				getTeams();
			}
		});
		feathersApp.service('teams').find().then(function(result){
			setTeams(result.data);
			if (!rankedTeams.length) {
				setRankedTeams(result.data);
			}
		});
	};

	getTeams = () => {
		var setRankedTeams = this.setRankedTeams;
		var feathersApp = this.props.feathersApp;
		feathersApp.service('rankings').find({query: {user: this.props.userId, $populate: 'ranks', $sort: {week: -1}, $limit: 1}}).then(function(result) {
			if (result.total) { // Get last ranking
				setRankedTeams(result.data[0].ranks); 
			}
		});
	};

	setWeek = (week) => {
		if (typeof week.year == "string" && week.year == this.state.week.year._id) {
			week.year = this.state.week.year
		}
		// Another check will be necessary once year update is set up
		this.setState({
			week: week,
			submitted: false
		});	
	};

	setTeams = (teams) => {
		this.setState({
			teams: teams
		});
	};

	setRankedTeams = (rankedTeams) => {
		this.setState({
			rankedTeams: rankedTeams.filter(team => team.cflId > 0)
		});
	};

	setBlurb = (blurb) => {
		this.setState({
			blurb: blurb
		});
	};

	setWeekConfig = (weekConfig) => {
		this.setState({
			weekConfig: weekConfig
		});
	};

    setSubmitted = (submitted) => {
		this.setState({
			submitted: submitted
		});
	};

	componentDidMount() {
		if(!this.props.login) {
			this.setNotifications('error', 'Please login to access this app.')
		} else if (!this.props.admin) {
			this.setNotifications('error', 'You do not have ranker permissions, please contact /u/PickerPilgrim if this is in error.');
		} else {
			var getInfo = this.getInfo;
			var setWeekConfig = this.setWeekConfig;
			this.props.feathersApp.service('configs').find({query: { name: 'current_week'}}).then(function(result){
				setWeekConfig(result.data[0]._id);
				getInfo(result.data[0].value);
			});
		}
	}

	setNotifications = (type, message) => {
		this.setState({
			notification: {
				type: type,
				message: message,
				time: Date.now()
			}
		})
	};

	render() {
		return(
			<div className="app-wrapper">
				<header>
					<Info 
						teams={this.state.teams} 
						week={this.state.week} 
						username={this.props.username} 
						userId={this.props.userId} 
						userTeam={this.props.userTeam}
						setWeek={this.setWeek}
						weekConfig={this.state.weekConfig}
						setNotifications={this.setNotifications}
						submitted={this.state.submitted}
					/>
					<LoginButton />
				</header>
				<NotificationBar
					type={this.state.notification.type}
					message={this.state.notification.message}
					time={this.state.notification.time}
				/>
				<main>
					<TeamList 
						rankedTeams={this.state.rankedTeams} 
						setRankedTeams={this.setRankedTeams} 
					/>
					<Blurb 
						blurb={this.state.blurb}
						setBlurb={this.setBlurb}
					/>
					<SubmitButton 
						rankedTeams={this.state.rankedTeams}
						blurb={this.state.blurb}
						weekId={this.state.week._id} 
						userId={this.props.userId}
						submitted={this.state.submitted}
						setSubmitted={this.setSubmitted}
						setNotifications={this.setNotifications}
					/>
				</main>

				<Results 
					weekId={this.state.week._id}
					yearId={this.state.week.year}
				/>
				<UserList />
			</div>

		);
	}
};



