import React from 'react';

import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  }

  render() {    
    return (
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