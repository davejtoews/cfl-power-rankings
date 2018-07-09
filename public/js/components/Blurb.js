import React from 'react';

module.exports = class extends React.Component {
    state = {blurb: ''};

    componentWillReceiveProps(nextProps) {
		this.setState({
			blurb: nextProps.blurb
		});	
	}

    handleChange = (e) => {
		this.props.setBlurb(e.target.value.replace(/\n/g, ""));
	};

    render() {
		return(
			<textarea cols="30" rows="10" onChange={this.handleChange} value={this.state.blurb}></textarea>
		);
	}
};
