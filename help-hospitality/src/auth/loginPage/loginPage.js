import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './loginPage.css';
import Pizza from '../../images/pizza.jpg';
import FormErrors from '../formErrors/formErrors'

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {
        cognito: null,
        blankfield: false,
      },
    };
    this.clearErrorState = this.clearErrorState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      this.props.history.push('/profile');
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
      console.log('Your login error is:', err);
    }
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div className="login">
        <div className="loginForm">
          <img id="loginImg" src={Pizza} alt="Pizza" />
          <div id="loginFormText">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <br />

              <h3>Log In To Your Account</h3>
              <p>
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
                </p>
                <a id="resetLink" href="/forgotPassword">Forgot Password?</a>
                <br/>
                <a id="resetLink" href="/changePassword">Change Password</a>
                <div>
                 <FormErrors formerrors={this.state.errors} />
                 </div>
                <button type="submit" onClick={this.handleSubmit}>
                  Login
                </button>
                <br />
                <span id="signUpInfo">
                  Sign in to your account to view and edit your profile.
                </span>
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
