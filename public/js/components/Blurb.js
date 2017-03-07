import React from 'react';

module.exports = React.createClass({
	getInitialState: function() {
		return {blurb: ''};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			blurb: nextProps.blurb
		});	
	},
	handleChange: function(e) {
		this.props.setBlurb(e.target.value.replace(/\n/g, ""));
	},
	render: function () {
		return(
			<textarea cols="30" rows="10" onChange={this.handleChange} value={this.state.blurb}></textarea>
		);
	}
});
