import React, { Fragment } from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import './navbar.css'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

export default class Navbar extends React.Component {
  handleLogout = async event => {
    event.preventDefault()
    try {
      await Auth.signOut()
      this.props.auth.setAuthStatus(false)
      this.props.auth.setUser(null)
    } catch (error) {
      console.log('Error is:', error.message)
    }
  }
  render () {
    console.log('Props', this.props)
    return (
      <nav id='main-navigation'>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <div className='navBar' id='myHeader'>
          <div className='topNav'>
            {this.props.auth.isAuthenticated && this.props.auth.user && (
              <Fragment>Hello, {this.props.auth.user.username}</Fragment>
            )}
            <Link id='link' offset={-70} duration={500} to='/'>
              Home
            </Link>{' '}
            <Link id='link' to='/restaurants' className='max-screen'>
              Restaurants
            </Link>
            <Link id='link' to='/resources' className='max-screen'>
              Resources
            </Link>
            {!this.props.auth.isAuthenticated && (
              <Fragment>
                <Link id='link' to='/signup' className='max-screen'>
                  Sign Up
                </Link>
                <Link id='link' to='/login' className='max-screen'>
                  Log in
                </Link>
              </Fragment>
            )}
            {this.props.auth.isAuthenticated && (
              <Fragment>
                <Link
                  id='link'
                  to='/'
                  onClick={this.handleLogout}
                  className='max-screen'
                >
                  Log out
                </Link>
              </Fragment>
            )}
          </div>

          <div className='dropNav'>
            <i className='fa fa-align-justify' id='dropbtn' />
            <div className='dropdown-content'>
              <NavLink smooth to='/' className='min-screen'>
                Home
              </NavLink>
              <NavLink smooth to='/restaurants' className='min-screen'>
                Restaurants
              </NavLink>
              <NavLink smooth to='/resources' className='min-screen'>
                Resources
              </NavLink>
              <NavLink smooth to='/signup' className='min-screen'>
                Signup
              </NavLink>
              <NavLink smooth to='/login' className='min-screen'>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
