import React from 'react';
import PageNavbar from './PageNavbar';
import WildlifeRow from './WildlifeRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Wildlife extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wildlife: "",
      wildlives: [],
    };

    // HANDLERS:
    this.handleWildlifeChange = this.handleWildlifeChange.bind(this);

    // functions that make HTTP requests
    this.submitWildlife = this.submitWildlife.bind(this);

  }

  handleWildlifeChange(e) {
    this.setState({
      wildlife: e.target.value,
    });
  }

  componentDidMount() {}

  //  SUBMIT FUNCTIONS
  submitWildlife() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/wildlife/" + this.state.wildlife,
      {
        method: "GET", // The type of HTTP request.
      }
    )
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((wildlifeList) => {
        if (!wildlifeList) return;
        // Map each attribute of a ParkRow in this.state.recParks to an HTML element
        let wildlifeDivs = wildlifeList.map((wildlife, i) => (
          <WildlifeRow wildlife={wildlife} />
        ));

        // Set the state of the park list to the value returned by the HTTP response from the server.
        this.setState({
          wildlives: wildlifeDivs,
        });
      })

      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  render() {
    return (
      <div className="wildlife">
        <PageNavbar active="wildlife" />

        <div className="container wildlife-container">
          <div className="jumbotron">
            <div className="h4">Wildlife</div>
            <br></br>

            <div className="input-container">
              <input
                type="text"
                placeholder="Enter species name"
                value={this.state.wildlife}
                onChange={this.handleWildlifeChange}
                id="wildlifeName"
                className="wildlife-input"
              />

              <button
                id="submitWildlifeBtn"
                className="submit-btn"
                onClick={this.submitWildlife}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="jumbotron">
            <div className="parks-container">
              <div className="park">
                <div className="header">
                  <strong>Code</strong>
                </div>
                <div className="header">
                  <strong>Name</strong>
                </div>
                <div className="header">
                  <strong>State</strong>
                </div>
              </div>
              <div className="wildlife-container" id="results">
                {this.state.wildlives}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}