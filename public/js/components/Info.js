import PropTypes from 'prop-types';
import React from 'react';
import TeamSelect from './TeamSelect';
import NewWeek from './NewWeek';
import WeekList from './WeekList';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        teams: []
    };

    componentWillReceiveProps(nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	}

    render() {
		var year = (this.props.week) ? this.props.week.year.year : '';
		var yearId = (this.props.week) ? this.props.week.year._id : false;
		return(
			<section className="info">
				<details className="week-details">
					<summary>
						<svg className="icon icon-info">
							<use xlinkHref="#icon-info"></use>
						</svg>
					</summary>
					<WeekList 
						yearId={yearId}
						submitted={this.props.submitted}
					/>
					<NewWeek
						currentWeek={this.props.week}
						setWeek={this.props.setWeek}
						weekConfig={this.props.weekConfig}
						setNotifications={this.props.setNotifications}
					/>
				</details>
				<ul className="info-list">
					<li>Week: {this.props.week.name}</li>
					<li>{year}</li>
					<li>{this.props.username}</li>
				</ul>
				<TeamSelect 
					teams={this.state.teams} 
					userId={this.props.userId} 
					userTeam={this.props.userTeam}
					setNotifications={this.props.setNotifications}
				/>

			</section>

		);
	}
};