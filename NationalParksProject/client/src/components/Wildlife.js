import React from 'react';
import PageNavbar from './PageNavbar';
import WildlifeRow from './WildlifeRow';
import WildlifeTree from './WildlifeTree';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default class Wildlife extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wildlife: "",
      park: "",
      wildlives: [],
      parks: [],
      taxon: ""
    };

    // HANDLERS:
    this.handleWildlifeChange = this.handleWildlifeChange.bind(this);
    this.handleParkChange = this.handleParkChange.bind(this);
    this.handleTaxonChange = this.handleTaxonChange.bind(this);

    // functions that make HTTP requests
    this.submitWildlife = this.submitWildlife.bind(this);
    this.submitTree = this.submitTree.bind(this);

  }

  handleWildlifeChange(e) {
    this.setState({
      wildlife: e.target.value,
    });
  }

  handleParkChange(e) {
    this.setState({
      park: e.target.value,
    });
  }

  handleTaxonChange(e) {
    this.setState({
      taxon: e.target.value,
    });
  }

  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/parks", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((parksList) => {
        if (!parksList) return;
        // Map each Obj to an HTML element

        let parksDivs = parksList.map((parkObj, i) => (
          //<option id={decadeObj.decade} value={decadeObj.decade} />
          <option value={parkObj.PARK_NAME} />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          parks: parksDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  }

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

  // TODO
  // for phylogenetic trees
  submitTree() {
    // Send an HTTP request to the server.
    fetch(
      "http://localhost:8081/wildlife/tree/" + this.state.wildlife + "&" + this.state.park + '&' + this.state.taxon,
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
        <br></br>

        <div className="container wildlife-container">
          <div className="jumbotron">
            <div className="h4">Wildlife in Park</div>
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

              <Button variant="info" id="submitWildlifeBtn" className="submit-btn" onClick={this.submitWildlife}>Submit</Button>
            </div>

            <br></br>
            <div className="h4">Phylogenetic Tree</div>
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

              <input
                list="parks"
                placeholder="--Select park--"
                value={this.state.park}
                onChange={this.handleParkChange}
                id="park"
                className="park-input"
              />
              <datalist id="parks">{this.state.parks}</datalist>

              <input
                list="taxa"
                placeholder="--Select taxon--"
                value={this.state.taxon}
                onChange={this.handleTaxonChange}
                id="taxon"
                className="taxon-input"
              />
              <datalist id="taxa">
                <option value="order_name"></option>
                <option value="family"></option>
              </datalist>

              <Button variant="info" id="submitWildlifeBtn" className="submit-btn" onClick={this.submitTree}>Submit</Button>
            </div>


          </div>

          <div className="jumbotron">
            <div className="header-container">
              <div className="headers">
                <div className="header">
                  <strong>Code</strong>
                </div>
                <div className="header">
                  <strong>Scientific name</strong>
                </div>
                <div className="header">
                  <strong>Order</strong>
                </div>
                <div className="header">
                  <strong>Family</strong>
                </div>
                <div className="header">
                  <strong>Common name(s)</strong>
                </div>
              </div>
              <div className="results-container" id="results">
                {this.state.wildlives}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}