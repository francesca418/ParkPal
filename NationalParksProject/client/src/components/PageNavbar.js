import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: [],
			username: ""
		}
	}

	componentDidMount() {
		const pageList = ['dashboard', 'parks', 'trails', 'wildlife', 'login', 'signup'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return (
					<a className="nav-item nav-link active" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				)
			}
			else {
				return (
					<a className="nav-item nav-link" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</a>
				)
			}
		})

		this.setState({
			navDivs: navbarDivs
		});

		var username = localStorage.getItem("username")
		this.setState({ username: username })
	}

	logout() {
		localStorage.removeItem("username")
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			      <span className="navbar-brand center">ParkPal</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {this.state.navDivs}
			        </div>
					<button className="logout-btn" onClick={this.logout}>Logout</button>
			      </div>
				  <span>Hey {this.state.username}</span>
			    </nav>
			</div>
  	);
	}
}