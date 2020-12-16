import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class WildlifeRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div className="wildlifeResults">
        <div className="park_code">{this.props.wildlife.PARK_NAME}</div>
        <div className="park_name">{this.props.wildlife.SCIENTIFIC_NAME}</div>
        <div className="state">{this.props.wildlife.COMMON_NAMES}</div>
      </div>
    );
	}
}
