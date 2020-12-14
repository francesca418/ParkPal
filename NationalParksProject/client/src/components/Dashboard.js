import React from 'react';

import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DashboardMovieRow from './DashboardMovieRow';
import GenreButton from './GenreButton';
import PageNavbar from './PageNavbar';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreList => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) =>
          <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */

  //QUESTION: Where should I be mentioning DashboardMovieRow type here??????

  showMovies(genre) {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres/" + genre, {
      method: "GET", // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(movieList => {
        // Map each attribute of a DashboardMovieRow in this.state.MOVIES to an HTML element
        let movieDivs = movieList.map((movie, i) => (
        <DashboardMovieRow movie = {movie}/>
        ));

        // Set the state of the person list to the value returned by the HTTP response from the server.
        this.setState({
          movies: movieDivs,
        });
      })
      
      .catch(err => console.log(err)); // Print the error if there is one.
  
  }

  render() {    
    return (
      // <div className="Dashboard">

      //   <PageNavbar active="dashboard" />

      //   <br></br>
      //   <div className="container movies-container">
      //     <div className="jumbotron">
      //       <div className="h5">Top Movies</div>
      //       <div className="genres-container">
      //         {this.state.genres}
      //       </div>
      //     </div>

      //     <br></br>
      //     <div className="jumbotron">
      //       <div className="movies-container">
      //         <div className="movies-header">
      //           <div className="header-lg"><strong>Title</strong></div>
      //           <div className="header"><strong>Rating</strong></div>
      //           <div className="header"><strong>Vote Count</strong></div>
      //         </div>
      //         <div className="results-container" id="results">
      //           {this.state.movies}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div className="Dashboard">
        <PageNavbar active="dashboard" />
        <br></br>
        <div className="map-container">
          {/* map loaded with leaflet https://react-leaflet.js.org/docs/example-popup-marker */}

          <MapContainer className="map-container" center={[39.8, -98.6]} zoom={5} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[37.3, -113.05]}>
              <Popup>
                Zion National Park
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  }
}