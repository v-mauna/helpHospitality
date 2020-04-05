import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './loginPage.css'
import People from '../../images/people.jpg'

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    event.preventDefault();
		// Form validation
		this.clearErrorState();
		const { password, username, } = this.state;
		try {
			const user = await Auth.signIn({
				username,
				password,
				});
			this.props.history.push('/restaurants');
      console.log('User',user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user)
		} catch (error) {
			let err = null;
			!error.message ? (err = { message: error }) : (err = error);
			this.setState({
				errors: {
					...this.state.errors,
					cognito: error
				}
			});
			console.log('err', err);
		}
	};

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div>
        <div id="login">
          <img id="loginImg" src={People} alt="People Gathered"/>
          <p id="header">Log in</p>
          <form id="loginImg" onSubmit={this.handleSubmit}>
          <p>
                Username: <br/>
                <input 
                  className="input" 
                  type="text"
                  name="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
              <p className="control has-icons-left">
                Password: <br/>
                <input 
                  className="input" 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
              </p>
              <p>
              <a id="link" href="/forgotpassword">Forgot password?</a>
              </p>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Login
                </button>
                <br/>
                Sign in to your account to view and edit your profile.
                </p>
                </div>
          </form>
          </div>
          </div>

    );
  }
}

export default LogIn;