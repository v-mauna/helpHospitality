import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './loginPage.css';
import People from '../../images/people.jpg';

class LogIn extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      cognito: null,
      blankfield: false,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
      },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    event.preventDefault();
    // Form validation
    this.clearErrorState();
    const { password, username } = this.state;
    try {
      const user = await Auth.signIn({
        username,
        password,
      });
      this.props.history.push('/restaurants');
      console.log('User', user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: error,
        },
      });
      console.log('err', err);
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="login">
        <div className="loginForm">
          <img id="loginImg" src={People} alt="table" />
          <p id="loginFormText">
            <br />
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <h3>Log In To Your Account</h3>
              <label htmlFor="username">username</label>
              <br />
              <input
                id="loginInputBox"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                placeholder="Enter your username or email"
                type="text"
              />
              <br />
              <label value={this.state.password} htmlFor="password">
                password
                <br />
              </label>
              <input
                id="loginInputBox"
                name="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Enter your password"
              />
              <br />
              <button type="submit" onClick={this.handleSubmit}>
                Login
              </button>
              <br />
              <span>
                Sign in to your account to view and edit your profile.
              </span>
            </form>
          </p>
        </div>
      </div>
    );
  }
}

export default LogIn;
