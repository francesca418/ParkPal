import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRowPark from './RecommendationsRowPark';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cityName: "",
			wildlifeLifeName: "",
			latLongRange: 0,
			recParks: [],
			recTrails: []
		}

		// handlers for new inputs
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleWildlifeChange = this.handleWildlifeChange.bind(this);
		this.handleLatLongChange = this.handleLatLongChange.bind(this);

		// functions that make HTTP requests
		this.submitCity = this.submitCity.bind(this);
		this.submitCityForTrails = this.submitCityForTrails.bind(this);
		this.submitWildlife = this.submitWildlife.bind(this);
	}

	handleCityChange(e) {
		this.setState({
			cityName: e.target.value
		});
	}

	handleLatLongChange(e) {
		this.setState({
			latLongRange: e.target.value
		});
	}

	handleWildlifeChange(e) {
		this.setState({
			wildlifeName: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// // Hint: Name of movie submitted is contained in `this.state.movieName`.
	// submitMovie() {
	// 	    // Send an HTTP request to the server.
	// 		fetch("http://localhost:8081/recommendations/" + this.state.movieName, {
	// 			method: "GET", // The type of HTTP request.
	// 		  })
	// 			.then(res => res.json()) // Convert the response data to a JSON.
	// 			.then(movieList => {
	// 			  // Map each attribute of a DashboardMovieRow in this.state.MOVIES to an HTML element
	// 			  let movieDivs = movieList.map((movie, i) => (
	// 			  <RecommendationsRow movie = {movie}/>
	// 			  ));
		  
	// 			  // Set the state of the person list to the value returned by the HTTP response from the server.
	// 			  this.setState({
	// 				recMovies: movieDivs,
	// 			  });
	// 			})
				
	// 			.catch(err => console.log(err)); // Print the error if there is one.

	// }

	/* FUNCTIONS TO MAKE HTTP REQUESTS TO THE SERVER */

	submitCity() {

	}

	submitCityForTrails() {

	}

	submitWildlife() {

	}

	
	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron park">
			    		{/* <div className="h5">Recommendations</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Movie Name" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
			    			<button id="submitMovieBtn" className="submit-btn" onClick={this.submitMovie}>Submit</button>
			    		</div>
			    		<div className="header-container">
			    			<div className="h6">You may like ...</div>
			    			<div className="headers">
			    				<div className="header"><strong>Title</strong></div>
			    				<div className="header"><strong>Movie ID</strong></div>
					            <div className="header"><strong>Rating</strong></div>
					            <div className="header"><strong>Vote Count</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recMovies}
			    		</div> */}

						<div className="h4">Recommendations</div>
						
						<br></br>
						<div className="h5">For parks</div>
						
						<div className="input-container">
			    			<input type='text' placeholder="Enter city" value={this.state.city} onChange={this.handleCityChange} id="cityName" className="city-input"/>
							<input type='number' step="0.1" min="0" placeholder="Enter lat/long range" value={this.state.range} onChange={this.handleLatLongChange} id="latLongRange" className="range-input" />
 			    			<button id="submitCityBtn" className="submit-btn" onClick={this.submitCity}>Submit</button>
			    		</div>

						<div className="h6">Or</div>

						<div className="input-container">
			    			<input type='text' placeholder="Enter wildlife" value={this.state.wildlife} onChange={this.handleWildlifeChange} id="wildlifeName" className="wildlife-input"/>
							<label>Status:
							<input list="statuses"/></label>
							<datalist id="statuses">
								<option value="Common"></option>
								<option value="In recovery"></option>
								<option value="Endangered"></option>
								<option value="Species of concern"></option>
							</datalist>
							<button id="submitWildlifeBtn" className="wildlife-btn" onClick={this.submitWildlife}>Submit</button>
			    		</div>
						
						<br></br>
						<div className= "h5">For trails</div>

						<div className="input-container">
			    			<input type='text' placeholder="Enter city" value={this.state.city} onChange={this.handleCityChange} id="cityName" className="city-input"/>
							<input type='number' step="0.1" min="0" placeholder="Enter lat/long range" value={this.state.range} onChange={this.handleLatLongChange} id="latLongRange" className="range-input" />
 			    			<button id="submitCityBtn" className="submit-btn" onClick={this.submitCityForTrails}>Submit</button>
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}