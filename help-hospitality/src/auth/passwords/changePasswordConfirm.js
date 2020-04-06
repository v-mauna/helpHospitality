import React, { Component } from "react";
import './changePassword.css'

class ChangePasswordConfirmation extends Component {
  render() {
    return (
      <section className="fogotPassword">
        <div className="fogotPasswordForm">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
        </div>
      </section>
    );
  }
}

export default ChangePasswordConfirmation;