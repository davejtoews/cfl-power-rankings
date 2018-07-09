import React from 'react';
import classNames from 'classnames';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => {
	var teamClassName = classNames(value.toLowerCase());
	return(
		<li className={teamClassName} >{value}</li>
	);
});

const SortableList = SortableContainer(({items}) => {
    return (
        <ul className="team-list">
            {items.map((value, index) =>
                <SortableItem key={value._id} index={index} value={value.location} />
            )}
        </ul>
    );
});

module.exports = class extends React.Component {
    state = {teams: []};

    componentWillReceiveProps(nextProps) {
		this.setState({
			teams: nextProps.teams
		});	
	}

    onSortEnd = (event) => {
        this.props.setTeams(arrayMove(this.state.teams, event.oldIndex, event.newIndex));
    };

    render() {
		return(
			<SortableList items={this.state.teams} onSortEnd={this.onSortEnd} helperClass="sort-helper"/>
		);
	}
};
