import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ParkRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      // <div className="movieResults">
      // 	<div className="title">{this.props.movie.title}</div>
      // 	<div className="id">{this.props.movie.id}</div>
      // 	<div className="rating">{this.props.movie.rating}</div>
      // 	<div className="votes">{this.props.movie.vote_count}</div>
      // </div>

      <div className="parkResults">
        <div className="park_code">{this.props.park.PARK_CODE}</div>
        <div className="park_name">{this.props.park.PARK_NAME}</div>
        <div className="state">{this.props.park.STATE}</div>
        <div className="acres">{this.props.park.ACRES}</div>
        <div className="latitude">{this.props.park.LATITUDE}</div>
        <div className="longitude">{this.props.park.LONGITUDE}</div>
        <div className="num_species">{this.props.park.NUM_SPECIES}</div>
      </div>
    );
	}
}
