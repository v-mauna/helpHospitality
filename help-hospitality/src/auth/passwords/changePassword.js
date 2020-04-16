import React, { Component } from 'react'
import FormErrors from '../formErrors/formErrors'
import Validate from '../utility/FormValidation'
import { Auth } from 'aws-amplify'
import PeterPans from '../../images/peterPans.jpg'
import './changePassword.css'

export default class ChangePassword extends Component {
  state = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false,
    },
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false,
      },
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    // Form validation
    this.clearErrorState()
    const error = Validate(event, this.state)
    if (error) {
      this.setState(prevState=>({
        errors: [prevState.errors, ...error ],
      }))
    }
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(
        user,
        this.state.oldpassword,
        this.state.newpassword
      )
      this.props.history.push('/changepasswordconfirmation')
    } catch (err) {
      console.log('Change password error', err)
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
    document.getElementById(event.target.id).classList.remove('is-danger')
  }
  render() {
    return (
      <div className="changePassword">
        <div className="changePasswordForm">
          <img id="peterPans" src={PeterPans} alt="Peter Pans Donut Shop" />
          <div id="changePasswordFormText">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <br />

              <h3>Change Your Password</h3>
              <p>
                <label htmlFor="username">Old password</label>
                <br />
                <input
                  id="inputBox"
                  value={this.state.oldpassword}
                  onChange={this.handleChange}
                  name="oldPassword"
                  placeholder="Enter your old password"
                  type="text"
                />
                <br />
                <label value={this.state.newpassword} htmlFor="password">
                  New Password
                  <br />
                </label>
                <input
                  id="inputBox"
                  name="newpassword"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Enter your new password"
                />
                <br/>
                <label value={this.state.confirmpassword} htmlFor="password">
                  Confirm Password
                  <br />
                </label>
                <input
                  id="inputBox"
                  name="confirmpassword"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Confirm password"
                />

                </p>
                <a id="resetLink" href="/forgotPassword">Forgot Password?</a>
                <div>
                 <FormErrors formerrors={this.state.errors} />
                 </div>
                <button type="submit" onClick={this.handleSubmit}>
                  Submit
                </button>
                <br />
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}


//   render () {
//     return (
//       <div className='changePassword'>
//         <div className='changePasswordForm'>
//           <img id='peterPans' src={PeterPans} alt='Peter Pans Donut Shop' />
//           <div id='changePasswordText'>
//             <form onSubmit={this.handleSubmit}>
//               <br />
//               <p>
//                 <span>Change Password</span><br/>
//                 <input
//                   className='input'
//                   type='password'
//                   id='oldpassword'
//                   placeholder='Old password'
//                   value={this.state.oldpassword}
//                   onChange={this.onInputChange}
//                 />
//                 <br />
//                 <input
//                   className='input'
//                   type='password'
//                   id='newpassword'
//                   placeholder='New password'
//                   value={this.state.newpassword}
//                   onChange={this.onInputChange}
//                 />
//                 <br />
//                 <input
//                   className='input'
//                   type='password'
//                   id='confirmpassword'
//                   placeholder='Confirm password'
//                   value={this.state.confirmpassword}
//                   onChange={this.onInputChange}
//                 />
//                 <br />
//                 <a id='resetLink' href='/forgotpassword'>
//                   Forgot password?
//                 </a>
//                 <div>
//                 <FormErrors formerrors={this.state.errors} />
//                 </div>
//                 <br />
//                 <button type='submit' className='button is-success'>
//                   Change password
//                 </button>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default ChangePassword
