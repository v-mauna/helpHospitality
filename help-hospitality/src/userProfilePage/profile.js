import React, { Component } from 'react'
import axios from 'axios'
const config = require('../config.json')

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      newRestaurant: {
        name: '',
        address: '',
        city: '',
        hours: '',
        bio: '',
        donations: '',
      },
      restaurants: [],
    }
    this.handleAddRestaurant = this.handleAddRestaurant.bind(this)
    this.handleUpdateRestaurants = this.handleUpdateRestaurants.bind(this)
    this.handleDeleteRestaurant = this.handleDeleteRestaurant.bind(this)
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
      } = this.state.newRestaurant
      const username = this.props.auth.user.username
      const params = {
        id: name,
        name,
        address,
        city,
        hours,
        bio,
        donations,
        username: username,
      }
      await axios.post(`${config.api.invokeUrl}/restaurants/${name}`, params)
      this.setState(prevState => ({
        restaurants: [prevState.restaurants, prevState.newRestaurant],
      }))
      this.setState({
        newRestaurant: {
          id: '',
          name: '',
          address: '',
          city: '',
          hours: '',
          bio: '',
          donations: '',
          neighborhood: '',
        },
      })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
  }
  const
  handleUpdateRestaurants = async (name, hours, donations) => {
    // call to AWS API Gateway update restaurant endpoint here
    try {
      const params = {
        hours: hours,
        donations: donations,
      }
      await axios.patch(`${config.api.invokeUrl}/restaurants/${name}`, params)
      const restaurantToUpdate = [...this.state.restaurants].find(
        restaurant => restaurant.id === name
      )
      const updatedRestaurants = [...this.state.restaurants].filter(
        restaurant => restaurant.id !== name
      )
      restaurantToUpdate.name = name
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
      const updatedRestaurants = [...this.state.restaurant].filter(
        restaurant => restaurant.id !== id
      )
      this.setState({ restaurants: updatedRestaurants })
    } catch (err) {
      console.log(`Unable to delete restaurant: ${err}`)
    }
  }

  fetchUserRestaurants = async () => {
    // call to AWS API Gateway to fetch restaurants by username here
    // then set them in state
    try {
      const username = this.props.auth.user.username
      const res = await axios.get(`${config.api.invokeUrl}/user/${username}`)
      const restaurants = res.data
      this.setState({ restaurants })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
  }

  handleChange = event => {
    console.log('nr', this.state.newRestaurant)
    this.setState({
      newRestaurant: {
        ...this.state.newRestaurant,
        [event.target.name]: event.target.value,
      },
    })
  }

  componentDidMount = () => {
    this.fetchUserRestaurants()
  }
  render () {
    const newRestaurant = this.state.newRestaurant
    return (
      <div className='userProfile'>
        <div className='addResturantForm'>
          <div id='addRestaurantText'>
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <br />

              <h3>Use the form below to add your restaurant</h3>
              <p>
                <label>Name</label>
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
                <label>Address</label>
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
                <label>City</label>
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
                <label>Neighborhood</label>
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
                <label>Operating Hours: (if applicable)</label>
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
                <label>Bio</label>
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
                <label>Donations</label>
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
      </div>
    )
  }
}

export default Profile
