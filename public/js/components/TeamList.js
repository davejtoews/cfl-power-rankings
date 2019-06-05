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
    state = {rankedTeams: []};

    componentWillReceiveProps(nextProps) {
		this.setState({
			rankedTeams: nextProps.rankedTeams
		});	
	}

    onSortEnd = (event) => {
        this.props.setRankedTeams(arrayMove(this.state.rankedTeams, event.oldIndex, event.newIndex));
    };

    render() {
		return(
			<SortableList items={this.state.rankedTeams} onSortEnd={this.onSortEnd} helperClass="sort-helper"/>
		);
	}
};
