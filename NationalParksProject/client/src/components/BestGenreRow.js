import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.genreRow.genre}</div>
				<div className="rating">{this.props.genreRow.avg_rating}</div>
			</div>
		);
	}
}
