import PropTypes from 'prop-types';
import React from 'react';

module.exports = class extends React.Component {
    static contextTypes = {
		feathersApp: PropTypes.object,
		login: PropTypes.bool
	};

    handleClick = (e) => {
		if (this.context.login) {
			e.preventDefault();
			this.props.getRankings();
		}
	};

    render() {
		return(
			<a href="#" className="button" onClick={ this.handleClick }>Results</a>
		);
	}
};