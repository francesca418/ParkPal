import React from 'react';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			commonName: "",
			recParks: [],
		};

		this.handleCommonNameChange = this.handleCommonNameChange.bind(this);
	}

	handleCommonNameChange(e) {
		this.setState({
		  commonName: e.target.value,
		});
	  }

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		
	}

	submitCommonName() {
		
	}

	render() {

		return (
			<div className="wildlife">
				<PageNavbar active="wildlife" />
				
				<div className="container wildlife-container">
					<div className="jumbotron">
						<div className="h4">Where to find wildlife</div>
						<br></br>
						
						<div className="input-container">
			    			<input type='text' placeholder="Enter common name" value={this.state.commonName} onChange={this.handleCommonNameChange} id="commonName" className="commonName-input"/>
 			    			<button id="submitCommonNameBtn" className="submitCommonName-btn" onClick={this.submitCommonName}>Submit</button>
			    		</div>
					</div>
				</div>
			</div>
		);
	}
}