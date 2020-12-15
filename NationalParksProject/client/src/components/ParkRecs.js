import React from 'react';
import PageNavbar from './PageNavbar';
import ParkRow from './ParkRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ParkRecs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cityName: "",
			latLongRange: 0,
			wildlifeName: "",
			status: "",
			recParks: [],
		}

		// handlers for new inputs
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleLatLongChange = this.handleLatLongChange.bind(this);
		this.handleWildlifeChange = this.handleWildlifeChange.bind(this);
		this.handleStatusChange = this.handleStatusChange.bind(this);

		// functions that make HTTP requests
		this.submitCity = this.submitCity.bind(this);
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

	handleStatusChange(e) {
		this.setState({
			status: e.target.value
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

						<div className="h4">Park Recommendations</div>
						<br></br>
						
						<div className="input-container">
			    			<input type='text' placeholder="Enter city" value={this.state.city} onChange={this.handleCityChange} id="cityName" className="city-input"/>
							<input type='number' step="0.1" min="0" placeholder="Enter lat/long range" value={this.state.range} onChange={this.handleLatLongChange} id="latLongRange" className="range-input" />
 			    			<button id="submitCityBtn" className="submit-btn" onClick={this.submitCity}>Submit</button>
			    		</div>

						<div className="h6">Or</div>

						<div className="input-container">
							<input list="categories" placeholder="--Select wildlife--" value={this.state.wildlife} onChange={this.handleWildlifeChange} id="wildlife" className="wildlife-input" />
							<datalist id="categories">
								<option value="Algae"></option>
								<option value="Amphibian"></option>
								<option value="Bird"></option>
								<option value="Crab/Lobster/Shrimp"></option>
								<option value="Fish"></option>
								<option value="Fungi"></option>
								<option value="Insect"></option>
								<option value="Invertebrate"></option>
								<option value="Mammal"></option>
								<option value="Nonvascular Plant"></option>
								<option value="Reptile"></option>
								<option value="Slug/Snail"></option>
								<option value="Spider/Scorpion"></option>
								<option value="Vascular Plant"></option>
							</datalist>

							<input list="statuses" placeholder="--Select status--" value={this.state.status} onChange={this.handleStatusChange} id="status" className="status-input" />
							<datalist id="statuses">
								<option value="Common"></option>
								<option value="In recovery"></option>
								<option value="Endangered"></option>
								<option value="Species of concern"></option>
							</datalist>
							<button id="submitWildlifeBtn" className="wildlife-btn" onClick={this.submitWildlife}>Submit</button>
			    		</div>
						
			    	</div>
			    </div>
		    </div>
		);
	}
}