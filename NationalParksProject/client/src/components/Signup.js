import React from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import PageNavbar from './PageNavbar';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false,
    }

    this.submitForm = this.submitForm.bind(this);
  }

  handleChange = (e) => {
   this.setState({
     [e.target.id]: e.target.value
   }); 
  }

  componentDidMount() {

  }

  submitForm(e) {
    e.preventDefault();

    fetch('http://localhost:8081/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then((res) => res.json())
    .then((result => {
      if (result.message !== undefined) {
        this.setState({ error: result.message });
      } else {
        this.setState({ redirect: true });
      }
    }));
  }

  render() {   
    const { error, redirect } = this.state;

    if (redirect) {
      console.log("Redirecting to login")
      return <Redirect to ="/login" />;
    }
    
    return (
      <div className="Signup">
        <PageNavbar active="signup" />
        <br></br>
        <div className="container signup-container">
            <div className="jumbotron park">

                <div className="h4">User signup</div>
                <br></br>

                {error !== null ? (
                  ''
                ) : (
                  <div className="error-text-wrapper">
                    <span className="error-text">{error}</span>
                  </div>
                )}

                <input
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    id="username"
                    name="username"
                    className="username-input"
                />
                <input
                    type="text"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    id="password"
                    name="username"
                    className="password-input"
                />
                <Button variant="info" id="submitFormBtn" className="submitForm-btn" onClick={this.submitForm}>Submit</Button>

                <div className="signup-wrapper">
                  <a href="/login" className="signup-redirect">
                    Have an account? Login here
                  </a>
                </div>
            </div>
        </div>
      </div>
    );
  }
}