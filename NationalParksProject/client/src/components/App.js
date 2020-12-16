import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import ParkRecs from './ParkRecs';
import TrailRecs from './TrailRecs';
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
							path="/parks"
							render={() => (
								<ParkRecs />
							)}
						/>
						<Route
							path="/trails"
							render={() => (
								<TrailRecs />
							)}
						/>
						<Route
							path="/wildlife"
							render={() => (
								<Wildlife />
							)}
						/>
						<Route 
							exact
							path="/login"
							render={() => (
								<Login />
							)}
						/>
						<Route 
							exact
							path="/signup"
							render={() => (
								<Signup />
							)}
						/>
						<Route 
							exact
							path="/logout"
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}