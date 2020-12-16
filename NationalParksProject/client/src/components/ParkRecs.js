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
      USState: "",
      latLongRange: 0,
      category: "",
      status: "",
      recParks: [],
      USStateIDs: [],
      categories: [],
    };

    // handlers for new inputs
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleUSStateChange = this.handleUSStateChange.bind(this);
    this.handleLatLongChange = this.handleLatLongChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);

    // functions that make HTTP requests
    this.submitCity = this.submitCity.bind(this);
    this.submitWildlife = this.submitWildlife.bind(this);
  }

  handleCityChange(e) {
    this.setState({
      cityName: e.target.value,
    });
  }

  handleLatLongChange(e) {
    this.setState({
      latLongRange: e.target.value,
    });
  }


  handleStatusChange(e) {
    this.setState({
      status: e.target.value,
    });
  }

  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/states", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((USStatesList) => {
        if (!USStatesList) return;

        let USStatesDivs = USStatesList.map((USState, i) => (
          <option value={USState.STATE_ID} />
        ));

        this.setState({
          USStateIDs: USStatesDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
    
    fetch("http://localhost:8081/categories", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((categoriesList) => {
        if (!categoriesList) return;
        // Map each Obj to an HTML element

        let categoriesDivs = categoriesList.map((category, i) => (
          <option value={category.CATEGORY} />
        ));

        this.setState({
          categories: categoriesDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.

  }

  handleUSStateChange(e) {
    this.setState({
      USState: e.target.value,
    });
  }

  handleCategoryChange(e) {
    this.setState({
      category: e.target.value,
    });
  }

  /* FUNCTIONS TO MAKE HTTP REQUESTS TO THE SERVER */

  submitCity() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/parks/" +
        this.state.cityName +
        "&" +
        this.state.USState +
        "&" +
        this.state.latLongRange,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((parkList) => {
        if (!parkList) return;
        // Map each attribute of a ParkRow in this.state.recParks to an HTML element
        let parkDivs = parkList.map((park, i) => <ParkRow park={park} />);

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          recParks: parkDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  submitWildlife() {
    var paramToken =
      "http://localhost:8081/parks/" +
      this.state.category.split("/").join("%2F") +
      "&" +
      this.state.status;
    console.log(paramToken);
    fetch(
      paramToken,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((parkList) => {
        if (!parkList) return;
        // Map each attribute of a ParkRow in this.state.recParks to an HTML element
        let parkDivs = parkList.map((park, i) => <ParkRow park={park} />);

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          recParks: parkDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  render() {
    return (
      <div className="Recommendations">
        <PageNavbar active="recommendations" />
        <br></br>
        <div className="container recommendations-container">
          <div className="jumbotron park">
            <div className="h4">Park Recommendations</div>
            <br></br>

            <div className="input-container">
              <input
                type="text"
                placeholder="Enter city"
                value={this.state.city}
                onChange={this.handleCityChange}
                id="cityName"
                className="city-input"
              />

              <input
                list="us-states"
                placeholder="--Select state--"
                value={this.state.USState}
                onChange={this.handleUSStateChange}
                id="us-state"
                className="us-state-input"
              />
              <datalist id="us-states">{this.state.USStateIDs}</datalist>

              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="Enter mile radius"
                value={this.state.range}
                onChange={this.handleLatLongChange}
                id="latLongRange"
                className="range-input"
              />
              <button
                id="submitCityBtn"
                className="submit-btn"
                onClick={this.submitCity}
              >
                Submit
              </button>
            </div>

            <div className="h6">Or</div>

            <div className="input-container">
              <input
                list="categories"
                placeholder="--Select category--"
                value={this.state.category}
                onChange={this.handleCategoryChange}
                id="wildlife"
                className="wildlife-input"
              />
              <datalist id="categories">{this.state.categories}</datalist>

              <input
                list="statuses"
                placeholder="--Select status--"
                value={this.state.status}
                onChange={this.handleStatusChange}
                id="status"
                className="status-input"
              />
              <datalist id="statuses">
                <option value="Common"></option>
                <option value="In recovery"></option>
                <option value="Endangered"></option>
                <option value="Species of concern"></option>
                <option value="Not endangered"></option>
              </datalist>
              <button
                id="submitWildlifeBtn"
                className="wildlife-btn"
                onClick={this.submitWildlife}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="jumbotron">
            <div className="header-container">
              <div className="headers">
                <div className="header">
                  <strong>Code</strong>
                </div>
                <div className="header">
                  <strong>Name</strong>
                </div>
                <div className="header">
                  <strong>State</strong>
                </div>
                <div className="header">
                  <strong>Acreage</strong>
                </div>
                <div className="header">
                  <strong>Latitude</strong>
                </div>
                <div className="header">
                  <strong>Longitude</strong>
                </div>
              </div>
              <div className="results-container" id="results">
                {this.state.recParks}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}