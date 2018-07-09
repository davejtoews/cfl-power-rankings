import PropTypes from 'prop-types';
import React from 'react';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    state = {
        'users': []
    };

    setUsers = (users) => {
		this.setState({
			'users': users
		});
	};

    componentDidMount() {
		var setUsers = this.setUsers;
		this.context.feathersApp.service('users').find({'query': {'$populate' : 'team'}}).then(function(result){
			setUsers(result.data);
		}).catch(function(error){
			console.error('Error getting users!', error);
		});
	}

    render() {
		return(
			<div className="user-list">
				<h3>User list</h3>
				<ul>
					{this.state.users.map(function(user, key){
						var adminText = (user.admin) ? "admin" : "";
						var teamText = (user.team) ? user.team.location : "";
						return(
							<li key={key}>
								{user.reddit.name}
								<ul>
									<li>{teamText}</li>
									<li>{adminText}</li>
								</ul>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
};