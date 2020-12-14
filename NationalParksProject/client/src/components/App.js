import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import TripPlanning from './TripPlanning';
import Wildlife from './Wildlife';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/>
						<Route
							path="/tripplanning"
							render={() => (
								<TripPlanning />
							)}
						/>
						<Route
							path="/wildlife"
							render={() => (
								<Wildlife />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}