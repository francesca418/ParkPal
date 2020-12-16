import React from 'react';
import PageNavbar from './PageNavbar';
import TrailRow from './TrailRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TrailRecs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      USState: "",
      latLongRange: 0,
      feature: "",
      activity: "",
      difficulty: 0,
      recTrails: [],
      features: [],
      activities: [],
    };

    // handlers for new inputs
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleUSStateChange = this.handleUSStateChange.bind(this);
    this.handleLatLongChange = this.handleLatLongChange.bind(this);
    this.handleFeatureChange = this.handleFeatureChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);

    // functions that make HTTP requests
    this.submitCityForTrails = this.submitCityForTrails.bind(this);
    this.submitTrailInfo = this.submitTrailInfo.bind(this);
    this.submitTrailMetrics = this.submitTrailMetrics.bind(this);
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

  handleDifficultyChange(e) {
    this.setState({
      difficulty: e.target.value,
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
        // Map each Obj to an HTML element

        let USStatesDivs = USStatesList.map((USState, i) => (
          //<option id={decadeObj.decade} value={decadeObj.decade} />
          <option value={USState.STATE_ID} />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          USStateIDs: USStatesDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/features", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((featuresList) => {
        if (!featuresList) return;
        // Map each Obj to an HTML element

        let featuresDivs = featuresList.map((featureObj, i) => (
          //<option id={decadeObj.decade} value={decadeObj.decade} />
          <option value={featureObj.FEATURE} />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          features: featuresDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/activities", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((activitiesList) => {
        if (!activitiesList) return;
        // Map each Obj to an HTML element

        let activitiesDivs = activitiesList.map((activityObj, i) => (
          //<option id={decadeObj.decade} value={decadeObj.decade} />
          <option value={activityObj.ACTIVITY} />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          activities: activitiesDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  handleUSStateChange(e) {
    this.setState({
      USState: e.target.value,
    });
  }
  
  handleFeatureChange(e) {
    this.setState({
      feature: e.target.value,
    });
  }

  handleActivityChange(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  /* FUNCTIONS TO MAKE HTTP REQUESTS TO THE SERVER */

  submitCityForTrails() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/trails/" +
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
      .then((trailList) => {
        if (!trailList) return;
        // Map each attribute of a ParkRow in this.state.redParks to an HTML element
        let trailDivs = trailList.map((trail, i) => <TrailRow trail={trail} />);

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          recTrails: trailDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  submitTrailInfo() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/trails/" +
        this.state.feature +
        "&" +
        this.state.activity,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((trailList) => {
        if (!trailList) return;
        // Map each attribute of a ParkRow in this.state.redParks to an HTML element
        let trailDivs = trailList.map((trail, i) => <TrailRow trail={trail} />);

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          recTrails: trailDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  submitTrailMetrics() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/trails/" +
        this.state.cityName +
        "&" +
        this.state.USState +
        "&" +
        this.state.latLongRange +
        "&" +
        this.state.feature +
        "&" +
        this.state.activity +
        "&" +
        this.state.difficulty,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((trailList) => {
        if (!trailList) return;
        // Map each attribute of a ParkRow in this.state.redParks to an HTML element
        let trailDivs = trailList.map((trail, i) => <TrailRow trail={trail} />);

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          recTrails: trailDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  // TODO: 
  submitTrailGrading() {}

  render() {
    return (
      <div className="Recommendations">
        <PageNavbar active="recommendations" />

        <div className="container recommendations-container">
          <div className="jumbotron park">
            <div className="h4">Trail Recommender</div>
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

              <input
                list="features"
                placeholder="--Select feature--"
                value={this.state.feature}
                onChange={this.handleFeatureChange}
                id="feature"
                className="feature-input"
              />
              <datalist id="features">{this.state.features}</datalist>

              <input
                list="activities"
                placeholder="--Select activity--"
                value={this.state.activity}
                onChange={this.handleActivityChange}
                id="activity"
                className="activity-input"
              />
              <datalist id="activities">{this.state.activities}</datalist>

              <input
                type="number"
                step="1"
                min="1"
                max="7"
                placeholder="Enter difficulty"
                value={this.state.difficulty}
                onChange={this.handleDifficultyChange}
                id="difficulty"
                className="difficulty-input"
              />

              <button
                id="submitTrailMetrics"
                className="submit-btn"
                onClick={this.submitTrailMetrics}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="jumbotron">
            <div className="trails-container">
              <div className="trail">
                <div className="header">
                  <strong>Trail</strong>
                </div>
                <div className="header">
                  <strong>Park</strong>
                </div>
                <div className="header">
                  <strong>Popularity</strong>
                </div>
              </div>
              <div className="trails-container" id="results">
                {this.state.recTrails}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}