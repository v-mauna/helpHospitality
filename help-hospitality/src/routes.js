import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from '../src/homePage/home'
import Restaurants from '../src/restaurantsPage/restaurantsList'
import Resources from '../src/resourcesPage/resources'
import Signup from '../src/auth/signUpPage/signUp'
import Login from '../src/auth/loginPage/loginPage'
import Navbar from '../src/navBar/navbar'
import Footer from '../src/footer/footer'
import Profile from './userProfile/userInfo'
import ChangePassword from '../src/auth/passwords/changePassword'
import ChangePasswordConfirm from '../src/auth/passwords/changePasswordConfirm'
import ForgotPassword from '../src/auth/passwords/forgotPassword'
import ForgotPasswordVerification from '../src/auth/passwords/forgotPasswordVerification'
import ErrorPage from '../src/errorPage/errorPage'

class Routes extends Component {
  state = {
    isAuthenticated: false,
    user: null,
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  setUser = user => {
    this.setState({ user })
  }

  render () {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    }
    console.log('AuthProps', authProps)
    return (
      <Router>
        <div />
        <Navbar props={this.props} auth={authProps} />
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Home {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/resources'
            render={props => <Resources {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/restaurants'
            render={props => <Restaurants {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/signup'
            render={props => <Signup {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/login'
            render={props => <Login {...props} auth={authProps} />}
          />
          { this.state.isAuthenticated && this.state.user ? 
          <Route
            exact
            path='/profile'
            render={props => <Profile {...props} auth={authProps} />}/> : 
              <Route exact path="/*" render={props=><ErrorPage {...props} auth={authProps} />
          }/>}
          <Route
            exact
            path='/forgotpassword'
            render={props => <ForgotPassword {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/forgotpasswordverification'
            component={ForgotPasswordVerification}
          />
          <Route
            exact
            path='/changepassword'
            render={props => <ChangePassword {...props} auth={authProps} />}
          />
          <Route
            exact
            path='/changepasswordconfirmation'
            render={props => (
              <ChangePasswordConfirm {...props} auth={authProps} />
            )}
          />
          />
          <Route exact path="/*" render={props=><ErrorPage {...props} auth={authProps} />}/>
        </Switch>
      </Router>
    )
  }
}

export default Routes
