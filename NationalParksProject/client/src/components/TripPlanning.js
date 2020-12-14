import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/TripPlanning.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TripPlanning extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
	    // Send an HTTP request to the server.
		fetch("http://localhost:8081/decades", {
			method: 'GET' // The type of HTTP request.
		  })
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(decadesList => {
			  if (!decadesList) return;
			  // Map each Obj to an HTML element 

			  let decadesDivs = decadesList.map((decadeObj, i) =>
				//<option id={decadeObj.decade} value={decadeObj.decade} />
				<option value={decadeObj.decade} label={decadeObj.decade} />
			  );
	  
			  // Set the state of the genres list to the value returned by the HTTP response from the server.
			  this.setState({
				decades: decadesDivs
			  })
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/decades/" + this.state.selectedDecade, {
			method: "GET", // The type of HTTP request.
		  })
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(genreList => {
			  // Map each attribute of a BestGenreRow in this.state.GENRES to an HTML element
			  let genreDivs = genreList.map((genreRow, i) => (
			  <BestGenreRow genreRow = {genreRow}/>
			  ));
	  
			  // Set the state of the person list to the value returned by the HTTP response from the server.
			  this.setState({
				genres: genreDivs,
			  });
			})
			
			.catch(err => console.log(err)); // Print the error if there is one.
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="bestgenres" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}