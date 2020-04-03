import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from '../src/homePage/home'
import Restaurants from '../src/restaurantsPage/restaurantsList'
import Resources from '../src/resourcesPage/resources'
import Signup from '../src/auth/signUpPage/signUp'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/restaurants' component={Restaurants} />
        <Route exact path='/resources' component={Resources} />
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    )
  }
}

export default withRouter(Routes)