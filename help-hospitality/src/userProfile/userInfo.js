import React, { Component } from 'react'
import axios from 'axios'
import RestaurantEdit from './editRestaurant'
import Front from '../images/restaurantFront.jpg'
import './userInfo.css'
import {replaceSpaces, greeting} from '../helperFunctions'

const config = require('../config.json')
const initialNewRestaurant = {
  name: '',
  address: '',
  city: '',
  hours: '',
  bio: '',
  donations: '',
  neighborhood: '',
  website: '',
}


class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newRestaurant: {
        name: '',
        address: '',
        city: '',
        hours: '',
        bio: '',
        donations: '',
        neighborhood: '',
        website:''
      },
      restaurants: [],
      user: this.props.auth.user.username,
    }
    this.handleAddRestaurant = this.handleAddRestaurant.bind(this)
    this.handleUpdateRestaurants = this.handleUpdateRestaurants.bind(this)
    this.handleDeleteRestaurant = this.handleDeleteRestaurant.bind(this)
    this.fetchUserRestaurants = this.fetchUserRestaurants.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleAddRestaurant = async event => {
    event.preventDefault()
    //call to AWS API Gateway add restaurant endpoint here
    try {
      let {
        name,
        address,
        city,
        hours,
        bio,
        donations,
        neighborhood,
        website
      } = this.state.newRestaurant
      const id = replaceSpaces(name)
      neighborhood = replaceSpaces(neighborhood)
      const username = this.state.user
      const params = {
        id,
        name,
        address,
        city,
        hours,
        bio,
        donations,
        neighborhood,
        website,
        username: username,
      }
      await axios.post(`${config.api.invokeUrl}/restaurants/${id}`, params)
      await this.fetchUserRestaurants()
      this.setState({ newRestaurant: initialNewRestaurant })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
    await this.fetchUserRestaurants()
  }
  handleUpdateRestaurants = async params => {
    //call to AWS API Gateway add restaurant endpoint here
    try {
      let updatedRestaurant = await axios.put(`${config.api.invokeUrl}/restaurants/${params.id}`, params)
      console.log('UR data', updatedRestaurant.data)
      await this.fetchUserRestaurants()
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
    await this.fetchUserRestaurants()
  }
  handleDeleteRestaurant = async (id, event) => {
    event.preventDefault()
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/restaurants/${id}`)
      await this.fetchUserRestaurants()
    } catch (err) {
      console.log(`Unable to delete restaurant: ${err.message}`)
    }
  }

  fetchUserRestaurants = async () => {
    // call to AWS API Gateway to fetch restaurants by username here
    // then set them in state
    try {
      const username = this.state.user
      const res = await axios.get(`${config.api.invokeUrl}/user/${username}`)
      this.setState({ restaurants: res.data })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
  }


  handleChange = event => {
    this.setState({
      newRestaurant: {
        ...this.state.newRestaurant,
        [event.target.name]: event.target.value.toLowerCase(),
      },
    })
  }

  componentDidMount = () => {
    this.fetchUserRestaurants()
  }
  render () {
    const newRestaurant = this.state.newRestaurant
    const userRestaurants = this.state.restaurants.Items
    if (userRestaurants && userRestaurants.length > 0) {
      return (
        <article>
          <div className='userProfile'>
            <img src={Front} alt='Restaurant Front' />
            <div id='addRestaurantForm'>
              <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <br />
                <p id='profileText'>
                  {greeting()}  Please use the form below to submit your restaurant information.
                  </p>
                  <p>
                  Name
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.name}
                    onChange={this.handleChange}
                    name='name'
                    placeholder='Restaurant Name'
                    type='text'
                  />
                  <br />
                  Address
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.address}
                    onChange={this.handleChange}
                    name='address'
                    placeholder='Restaurant Address'
                    type='text'
                  />
                  <br />
                  City
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.city}
                    onChange={this.handleChange}
                    name='city'
                    placeholder='Restaurant City'
                    type='text'
                  />
                  <br />
                  Neighborhood:
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.neighborhood}
                    onChange={this.handleChange}
                    name='neighborhood'
                    placeholder='Your Neighborhood'
                    type='text'
                  />
                  <br />
                  Operating Hours (if applicable):
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.hours}
                    onChange={this.handleChange}
                    name='hours'
                    placeholder="Let us know if you're open"
                    type='text'
                  />
                  <br />
                  Bio
                  <br />
                  <input
                    id='bioBox'
                    value={newRestaurant.bio}
                    onChange={this.handleChange}
                    name='bio'
                    placeholder='Restaurant bio'
                    type='text'
                  />
                  <br />
                  Website
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.website}
                    onChange={this.handleChange}
                    name='website'
                    placeholder='Restaurant website'
                    type='text'
                  />
                  <br />
                  Donations
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.donations}
                    onChange={this.handleChange}
                    name='donations'
                    placeholder='Where can people send donations?'
                    type='text'
                  />
                  <br />
                  <span id='userProfileSpan'>All fields are required</span>
                  <br />
                  <button type='submit' onClick={this.handleAddRestaurant}>
                    Submit
                  </button>
                  <br />
                  
                </p>
              </form>

            <div id='usersRestaurantBlock'>
              <p id='userRestaurantHeader'>Your Restaurants</p>
              <br />
              {userRestaurants.map(restaurant => (
                <RestaurantEdit
                  isAdmin={true}
                  handleUpdate={this.handleUpdateRestaurants}
                  handleDelete={this.handleDeleteRestaurant}
                  name={restaurant.name}
                  hours={restaurant.hours}
                  donations={restaurant.donations}
                  bio={restaurant.bio}
                  neighborhood={restaurant.neighborhood}
                  address={restaurant.address}
                  city={restaurant.city}
                  id={restaurant.id}
                  website={restaurant.website}
                  key={restaurant.id}
                  username={restaurant.username}
                />
              ))}
            </div>
          </div>
          </div>
        </article>
      )
    }
    return (
      <article>
        <div className='userProfile'>
        <img id='profileImg' src={Front} alt='Restaurant Front' />
        <div id='addRestaurantForm'>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <br />
            <p id='profileText'>
                  {greeting()}  Please use the form below to submit your restaurant information.
                  </p>
                  <p>
                  Name
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.name}
                onChange={this.handleChange}
                name='name'
                placeholder='Restaurant Name'
                type='text'
              />
              <br />
              Address
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.address}
                onChange={this.handleChange}
                name='address'
                placeholder='Restaurant Address'
                type='text'
              />
              <br />
              City
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.city}
                onChange={this.handleChange}
                name='city'
                placeholder='Restaurant City'
                type='text'
              />
              <br />
              Neighborhood:
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.neighborhood}
                onChange={this.handleChange}
                name='neighborhood'
                placeholder='Your Neighborhood'
                type='text'
              />
              <br />
              Operating Hours (if applicable):
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.hours}
                onChange={this.handleChange}
                name='hours'
                placeholder='Operating Hours'
                type='text'
              />
              <br />
              Bio
              <br />
              <input
                value={newRestaurant.bio}
                onChange={this.handleChange}
                name='bio'
                id='bioBox'
                placeholder='Restaurant bio'
                type='text'
              />
              <br />
              Website
                  <br />
                  <input
                    id='restaurantInputBox'
                    value={newRestaurant.website}
                    onChange={this.handleChange}
                    name='website'
                    placeholder='Your website'
                    type='text'
                  />
                  <br />
              Donations
              <br />
              <input
                id='restaurantInputBox'
                value={newRestaurant.donations}
                onChange={this.handleChange}
                name='donations'
                placeholder='Where can people send donations?'
                type='text'
              />
              <br />
            </p>
            <button type='submit' onClick={this.handleAddRestaurant}>
              Submit
            </button>
          </form>
        </div>
        </div>
      </article>
    )
  }
}

export default Profile
