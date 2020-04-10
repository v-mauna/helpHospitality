import React, { Component } from 'react'
import axios from 'axios'
import './searchPage.css'
import Espresso from '../images/espresso.jpg'
import Restaurant from '../restaurantsPage/restaurant'

const config = require('../config.json')

const search = term => {
  term = term.toLowerCase()
  return function (restaurant) {
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.neighborhood.toLowerCase().includes(term) ||
      !term
    )
  }
}
export default class SearchPage extends Component {
  constructor () {
    super()
    this.state = {
      restaurants: [],
      searchValue: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.fetchRestaurants = this.fetchRestaurants.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchRestaurants = async () => {
    const apiUrl = config.api.invokeUrl
    const value = this.state.searchValue
    try {
      const response = await axios.get(`${apiUrl}/search/${value}`)
      this.setState({ restaurants: response.data })
      this.setState({searchValue: ''})
    } catch (error) {
      console.log('Your error is:', error)
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({restaurants: []})
    const searchValue = event.target.value

    this.setState({ searchValue: searchValue })
    console.log('State', this.searchValue)
  }

  handleSubmit = () => {
    this.fetchRestaurants()
  }

  render () {
    const restaurantList = this.state.restaurants.Items
    const { searchValue } = this.state
    if (!restaurantList) {
      return (
        <article>
          <div className='restaurants'>
            <img src={Espresso} alt='Espresso Machine' />
            <div id='restaurants'>
              <p id='text'>
                {' '}
                You can search through our list of restaurants by name or by
                neighborhood.
              </p>
              <input onChange={this.handleChange} type='text' value={searchValue} placeholder='Search' />
              <br />
              <button type='submit' onClick={this.handleSubmit}>
                Search
              </button>
            </div>
          </div>
        </article>
      )
    }
    return (
      <article>
        <div className='restaurants'>
          <img src={Espresso} alt='Espresso Machine' />
          <div id='restaurants'>
            <p id='text'>
              {' '}
              You can search through our list of restaurants by name or by
              neighborhood.
            </p>
            <input type='text' value={searchValue} onChange={this.handleChange} placeholder='Search' />
            <br />
            <button type='submit' onClick={this.handleSubmit}>
              Search
            </button>
         
          <div id='searchResultsBlock'>
            {restaurantList.map(restaurant => (
              <Restaurant
                isAdmin={false}
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
}
