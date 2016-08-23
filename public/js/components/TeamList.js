import React from 'react';
import { Sortable } from 'react-sortable';
import Team from './Team'

var SortableTeam = Sortable(Team);

module.exports = React.createClass({
	getInitialState: function() {
		return {
		  draggingIndex: null
		};
	},

	updateState: function(obj) {
		this.setState(obj);
	},
	render: function () {
		var teams = this.props.teams.map(function(team, i) {
			return (
				<SortableTeam 
				    key={i}
					updateState={this.updateState}
					teams={this.props.teams}
					draggingIndex={this.state.draggingIndex}
					sortId={i}
					outline="list"
				>{team}</SortableTeam>
			);
        }, this);
		return(
			<ul>
		        {teams}
			</ul>
		);
	}
});
