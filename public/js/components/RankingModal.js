import React from 'react';
import classNames from 'classnames';

module.exports = class extends React.Component {
    state = {
        ranking: {},
        open: false
    };

    componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.setState({
			ranking: nextProps.ranking,
			open: nextProps.open
		});	
	}

    handleClick = (e) => {
		e.preventDefault();
		this.props.closeModal();
	};

    render() {
		var statusClass = (this.state.open) ? 'open' : '';
		var notificationClasses = classNames('modal ' + statusClass);
		var listItems = '';
		var blurb;
		var week;
		var user;
		var team;
		if( Object.keys(this.state.ranking).length) {
			listItems = this.state.ranking.ranks.map(function(team){
				return (
					<li key={team._id}>{team.location}</li>
				);
			});
			blurb = (this.state.ranking.blurb) ? this.state.ranking.blurb : '';
			week = (this.state.ranking.week) ? this.state.ranking.week : '';
			user = (this.state.ranking.user) ? this.state.ranking.user : '';
			team = (this.state.ranking.team) ? this.state.ranking.team : '';
		}
		return(
			<div className={notificationClasses}>
				<div className="modal-content">
					<a href="#" onClick={this.handleClick}>X</a>
					<h3>Week {week}</h3>
					<h4>{user}: {team}</h4>
					<ol>{listItems}</ol>
					<p>{blurb}</p>
				</div>
			</div>
		);
	}
};
