import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ParkRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div className="parkResults">
        <div className="park_name">{this.props.park.PARK_NAME}</div>
        <div className="state">{this.props.park.STATE}</div>
        <div className="acres">{this.props.park.ACRES}</div>
        <div className="latitude">{this.props.park.LAT.toFixed(2)}</div>
        <div className="longitude">{this.props.park.LNG.toFixed(2)}</div>
        <div className="num_species">{this.props.park.NUM_SPECIES}</div>
      </div>
    );
	}
}