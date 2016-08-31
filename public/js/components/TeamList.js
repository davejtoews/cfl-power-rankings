import React from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

module.exports = React.createClass({
	getInitialState: function() {
		return {teams: []};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	},
	dragStart: function(e) {
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';

		// Firefox requires calling dataTransfer.setData
		// for the drag to properly work
		e.dataTransfer.setData("text/html", e.currentTarget);
	},
	dragEnd: function(e) {

		this.dragged.style.display = "block";
		this.dragged.parentNode.removeChild(placeholder);

		// Update state
		var teams = this.state.teams;
		var from = Number(this.dragged.dataset.id);
		var to = Number(this.over.dataset.id);
		if(from < to) to--;
		if(this.nodePlacement == "after") to++;
		teams.splice(to, 0, teams.splice(from, 1)[0]);
		this.props.setTeams(teams);
	},
	dragOver: function(e) {
		e.preventDefault();
		this.dragged.style.display = "none";
		if(e.target.className == "placeholder") return;
		this.over = e.target;
		e.target.parentNode.insertBefore(placeholder, e.target);

		var relY = e.clientY - this.over.offsetTop;
		var height = this.over.offsetHeight / 2;
		var parent = e.target.parentNode;

		if(relY > height) {
		  this.nodePlacement = "after";
		  parent.insertBefore(placeholder, e.target.nextElementSibling);
		}
		else if(relY < height) {
		  this.nodePlacement = "before";
		  parent.insertBefore(placeholder, e.target);
		}		
	},
	render: function () {
		return(
			<ul onDragOver={this.dragOver}>
		        {this.state.teams.map(function(team, i) {
					return (
						<li 
							key={i}
							data-id={i}
				            draggable="true"
				            onDragEnd={this.dragEnd}
				            onDragStart={this.dragStart}
						>{team.name}</li>
					)
				}, this)}
			</ul>
		);
	}
});
