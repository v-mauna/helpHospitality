import React, { Component } from 'react';
import FormErrors from '../formErrors/formErrors';
import Validate from '../utility/FormValidation';
import { Auth } from 'aws-amplify';
import './forgotPassword.css';
import PeterPans from '../../images/peterPans.jpg';

class ForgotPasswordVerification extends Component {
  constructor() {
    super();
    this.state = {
      confirmationcode: '',
      username: '',
      newpassword: '',
      errors: {
        cognito: null,
        blankfield: false,
      },
    };
    this.clearErrorState = this.clearErrorState.bind(this);
    this.passwordVerificationHandler = this.passwordVerificationHandler.bind(
      this
    );
    this.onInputChange = this.onInputChange.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
      },
    });
  };

  passwordVerificationHandler = async (event) => {
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
      const {username, confirmationcode, newpassword} = this.state;
      const ConfirmationCode = confirmationcode;
      console.log('Code',confirmationcode)
      await Auth.forgotPasswordSubmit(
        username,
        ConfirmationCode,
        newpassword
      );
      this.props.history.push('/changePasswordConfirmation');
    } catch (error) {
      console.log('Forgot Password Verification Error', error);
    }
  };

  onInputChange = (event) => {
    console.log('cc',event.target.id,event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    });
    document.getElementById(event.target.id).classList.remove('is-danger');
  };

  render() {
    return (
      <section className="forgotPassword">
        <div className="forgotPasswordForm">
          <img id="peterPans" src={PeterPans} alt="Peter Pans Donut Shop" />
          <div id="forgotPasswordText">
            <form onSubmit={this.passwordVerificationHandler}>
              <br />
              <span>Set new password</span>
              <p>
                Please enter the verification code sent to your email address
                below, your email address and a new password.
                <FormErrors formerrors={this.state.errors} />
                <input
                  type="text"
                  className="input"
                  id="confirmationcode"
                  name="confirmationcode"
                  aria-describedby="verificationCodeHelp"
                  placeholder="Enter verification code"
                  value={this.state.confirmationcode}
                  onChange={this.onInputChange}
                />
                <br />
                <input
                  className="input"
                  type="username"
                  name="username"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <br />
                <input
                  type="password"
                  className="input"
                  id="newpassword"
                  name="newpassword"
                  placeholder="New password"
                  value={this.state.newpassword}
                  onChange={this.onInputChange}
                />
                <br />
                <button className="button is-success">Login</button>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default ForgotPasswordVerification;
