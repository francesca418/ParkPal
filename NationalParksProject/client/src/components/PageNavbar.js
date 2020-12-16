import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
					<Nav.Link className="nav-item nav-link active" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</Nav.Link>
				)
			}
			else {
				return (
					<Nav.Link className="nav-item nav-link" key={i} href={"/" + page}>
						{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
					</Nav.Link>
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
				<Navbar bg="light" variant="light">
			      <Navbar.Brand>ParkPal</Navbar.Brand>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <Nav className="navbar-nav">
			        	{this.state.navDivs}
			        </Nav>
					
			      </div>
				  <Navbar.Text className="signed-in">Signed in as: {this.state.username}</Navbar.Text>
				  <Button variant="outline-danger" className="logout-btn" onClick={this.logout}>Logout</Button>
			    </Navbar>
			</div>
  	);
	}
}