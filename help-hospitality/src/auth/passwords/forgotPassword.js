import React, { Component } from 'react';
import FormErrors from '../formErrors/formErrors';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import PeterPans from '../../images/peterPans.jpg';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      errors: {
        cognito: null,
        blankfield: false,
      },
    };
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
      },
    });
  };

  forgotPasswordHandler = async (event) => {
    event.preventDefault();
    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error },
      });
    }
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('forgotPasswordVerification');
    } catch (error) {
      console.log('Error', error.message);
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove('is-danger');
  };

  render() {
    return (
      <section className="forgotPassword">
        <div className="forgotPasswordForm">
          <img id="peterPans" src={PeterPans} alt="Peter Pans Donut Shop" />
          <div id="forgotPasswordText">
            <form onSubmit={this.forgotPasswordHandler}>
              <br />
              <span>Forgot your password?</span>
              <p>
                Please enter the email address associated with your account and
                we'll email you a password reset link.
                <FormErrors formerrors={this.state.errors} />
                <input
                  type="email"
                  className="input"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <br/>
                <button type="submit" className="button is-success">Submit</button>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default ForgotPassword;
