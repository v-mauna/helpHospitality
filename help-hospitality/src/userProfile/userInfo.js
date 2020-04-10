import React, { Component } from 'react'
import axios from 'axios'
import RestaurantEdit from './editRestaurant'
import Front from '../images/restaurantFront.jpg'
import './userInfo.css'

const config = require('../config.json')
const initialNewRestaurant = {
  name: '',
  address: '',
  city: '',
  hours: '',
  bio: '',
  donations: '',
  neighborhood: '',
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
      const {
        name,
        address,
        city,
        hours,
        bio,
        donations,
        neighborhood,
      } = this.state.newRestaurant
      const id = name
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
        username: username,
      }
      console.log('Add params', params)
      await axios.post(`${config.api.invokeUrl}/restaurants/${id}`, params)
      await this.fetchUserRestaurants()
      this.setState({ newRestaurant: initialNewRestaurant })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
    await this.fetchUserRestaurants()
  }
  handleUpdateRestaurants = async (name, hours, donations) => {
    // call to AWS API Gateway update restaurant endpoint here
    try {
      const params = {
        id: name,
        hours: hours,
        donations: donations,
      }
      await axios.patch(`${config.api.invokeUrl}/restaurants/${name}`, params)
      const restaurantToUpdate = [...this.state.restaurants.Items].find(
        restaurant => restaurant.id === name
      )
      const updatedRestaurants = [this.prevState.restaurants.Items].filter(
        restaurant => restaurant.id !== name
      )
      restaurantToUpdate.name = name
      restaurantToUpdate.donations = donations
      restaurantToUpdate.hours = hours
      updatedRestaurants.push(restaurantToUpdate)
      this.setState({ restaurants: updatedRestaurants })
    } catch (err) {
      console.log(`Error updating restaurant: ${err}`)
    }
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
      console.log('Fetch user response.data', res.data)
      this.setState({ restaurants: res.data })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
  }


  handleChange = event => {
    this.setState({
      newRestaurant: {
        ...this.state.newRestaurant,
        [event.target.name]: event.target.value,
      },
    })
    console.log('NR', this.state.newRestaurant)
  }

  componentDidMount = () => {
    this.fetchUserRestaurants()
  }
  render () {
    const newRestaurant = this.state.newRestaurant
    const userRestaurants = this.state.restaurants.Items
    console.log('Profile State restaurants', userRestaurants)
    if (userRestaurants) {
      return (
        <article>
          <div className='userProfile'>
            <img src={Front} alt='Restaurant Front' />
            <div id='addRestaurantForm'>
              <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <br />
                <p id='profileText'>
                  <h4>Use the form below to add your restaurant:</h4> <br />
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
                  Operating Hours(if applicable):
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
                  key={restaurant.id}
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
        div className='userProfile'>
        <img id='profileImg' src={Front} alt='Restaurant Front' />
        <div id='addRestaurantForm'>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <br />
            <p id='profileText'>
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
              Operating Hours(if applicable):
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
                id='restaurantInputBox'
                value={newRestaurant.bio}
                onChange={this.handleChange}
                name='bio'
                placeholder='Restaurant bio'
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
      </article>
    )
  }
}

export default Profile
