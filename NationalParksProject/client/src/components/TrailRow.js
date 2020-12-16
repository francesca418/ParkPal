import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TrailRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div className="trailResults">
        <div className="trail_name">{this.props.trail.NAME}</div>
        <div className="park_name">{this.props.trail.PARK_NAME}</div>
        <div className="popularity">{this.props.trail.POPULARITY}</div>
        <div className="length">{this.props.trail.LENGTH}</div>
        <div className="elevation">{this.props.trail.ELEVATION_GAIN}</div>
        <div className="score">{this.props.trail.SCORE}</div>
      </div>
    );
	}
}