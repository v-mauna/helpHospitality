import React from 'react';
import Table from '../../images/table.jpg';
import './signUp.css';
import { Auth } from 'aws-amplify';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false,
      },
    });
  };
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // Form validation
    this.clearErrorState();
    const { email, password, username, firstName, lastName } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          name: firstName,
          family_name: lastName,
          email,
        },
      });
      this.props.history.push('/restaurants');
      console.log(signUpResponse);
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

  render() {
    return (
      <div className="signUp">
        <div className="signUpForm">
          <img id="signUpImg" src={Table} alt="table" />
          <div id="signUpFormText">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <h3>create an account</h3>
              <p>
              <label htmlFor="firstName">
                first name
                <br />
              </label>
              <input
                id="inputBox"
                value={this.state.firstName}
                onChange={this.handleChange}
                name="firstName"
                placeholder="Enter first name"
                type="text"
              />
              <br />
              <label htmlFor="lastName">
                last name
                <br />
              </label>
              <input
                id="inputBox"
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder="Enter last name"
                name="lastName"
                type="text"
              />
              <br />
              <label htmlFor="email">
                email
                <br />
              </label>
              <input
                id="inputBox"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                placeholder="Enter your email"
                type="text"
              />
              <br />
              <label htmlFor="username">username</label>
              <br />
              <input
                id="inputBox"
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
                id="inputBox"
                name="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Uppercase and number character required"
              />
              <br />
              <label value={this.state.password} htmlFor="password">
                Confirm password
                <br />
              </label>
              <input
                id="inputBox"
                name="confirmpassword"
                onChange={this.handleChange}
                type="password"
                placeholder="Confirm password"
              />
              <br />
              <button type="submit" onClick={this.handleSubmit}>
                create account
              </button>
              </p>
            </form>
        </div>
        </div>
      </div>
    );
  }
}

export default Signup;
