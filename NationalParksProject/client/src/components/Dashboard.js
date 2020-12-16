import React from 'react';

import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageNavbar from './PageNavbar';

import { LatLng } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parkLatLng: [],
      parkNames: [],
      parkAcres: []
    }
  }

  componentDidMount() {
    fetch(
      "http://localhost:8081/parks",
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((parkList) => {
        if (!parkList) return;
        this.setState({ parkLatLng: parkList.map(v => new LatLng(v.LAT, v.LNG)) });
        this.setState({ parkNames: parkList.map(v => v.PARK_NAME) });
        this.setState({ parkAcres: parkList.map(v => v.ACRES) });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  render() {    
    const markers = this.state.parkLatLng.map((v, i) => 
      <Marker key={i} position={v}>
        <Popup>{this.state.parkNames[i]} <br></br> Acres: {this.state.parkAcres[i]}</Popup>
      </Marker>
    );

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
            {markers}
          </MapContainer>
        </div>
      </div>
    );
  }
}