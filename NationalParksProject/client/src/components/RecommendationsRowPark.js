import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRowPark extends React.Component {
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
				<div className="park_code">{this.props.park.park_code}</div>
				<div className="park_name">{this.props.park.park_name}</div>
				<div className="state">{this.props.park.state}</div>
				<div className="acres">{this.props.park.acres}</div>
				<div className="latitude">{this.props.park.latitude}</div>
				<div className="longitude">{this.props.park.longitude}</div>
			</div>
		);
	}
}
