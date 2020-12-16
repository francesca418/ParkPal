import React from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import PageNavbar from './PageNavbar';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      redirect: false,
    }

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleChange(e) {
   this.setState({
     [e.target.id]: e.target.value
   }); 
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
    localStorage.setItem("username", e.target.value)
  }

  componentDidMount() {

  }

  submitForm(e) {
    e.preventDefault();

    fetch('http://localhost:8081/login', {
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
    .then((userInfo => {
      if (userInfo.message !== undefined) {
        this.setState({ error: userInfo.message });
      } else {
        this.setState({ redirect: true });
      }
    }));
  }

  render() {   
    const { error, redirect } = this.state;

    if (redirect) {
      console.log("Redirecting to dashboard")
      return <Redirect to ="/dashboard" />
    }
    
    return (
      <div className="Login">
        <PageNavbar active="login" />
        <br></br>
        <div className="container login-container">
            <div className="jumbotron park">

                <div className="h4">User login</div>
                <br></br>

                {error === null ? (
                  ''
                ) : (
                  <div className="error-text-wrapper">
                    <span className="error-text">{this.state.error}</span>
                  </div>
                )}

                <input
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
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
                  <a href="/signup" className="signup-redirect">
                    New user? Sign up here
                  </a>
                </div>
            </div>
        </div>
      </div>
    );
  }
}