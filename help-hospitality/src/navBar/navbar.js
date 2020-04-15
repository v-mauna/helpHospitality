import React, { Fragment } from 'react'
import { NavHashLink as NavLink } from 'react-router-hash-link'
import './navbar.css'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

export default class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout = async event => {
    event.preventDefault()
    try {
      await Auth.signOut()
      
      this.props.auth.setAuthStatus(false)
      this.props.auth.setUser(null)
    } catch (error) {
      console.log('Error is:', error.message)
    }
    window.location.assign('/login')
  }
  render () {
    console.log('props',this.props)
    return (
      <nav id='main-navigation'>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <div className='navBar' id='myHeader'>
          <div className='topNav'>
            <Link id='link' duration={500} to='/'>
              Home
            </Link>{' '}
            <Link id='link' to='/restaurants' className='max-screen'>
              Restaurants
            </Link>
            <Link id='link' to='/resources' className='max-screen'>
              Resources
            </Link>
            <Link id='link' to='/search' className='max-screen'>
              Search
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
                <Link id='link' to='/profile' className='max-screen'>
                  Profile
                </Link>
                <Link
                  id='link'
                  to='/login'
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
            SNYCR
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
              <NavLink smooth to='/search' className='min-screen'>
                Search
              </NavLink>
              {this.props.auth.isAuthenticated && (
                <Fragment>
                  <NavLink to='/profile' className='min-screen'>
                    Profile
                  </NavLink>
                  <NavLink
                    to='/login'
                    onClick={this.handleLogout}
                    className='min-screen'
                  >
                    Log out
                  </NavLink>
                </Fragment>
              )}
              {!this.props.auth.isAuthenticated && (
                <Fragment >
                  <NavLink smooth to='/signup' className='min-screen'>
                    Signup
                  </NavLink>
                  <NavLink smooth to='/login' className='min-screen'>
                    Login
                  </NavLink>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
