import React, { Component } from 'react'
import axios from 'axios'
import './searchPage.css'
import Espresso from '../images/espresso.jpg'
import Restaurant from '../restaurantsPage/restaurant'
import { replaceSpaces } from '../helperFunctions'

const config = require('../config.json')

export default class SearchPage extends Component {
  constructor () {
    super()
    this.state = {
      restaurants: [],
      searchValue: '',
      errorMessage: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.fetchRestaurants = this.fetchRestaurants.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchRestaurants = async () => {
    const apiUrl = config.api.invokeUrl
    let value = this.state.searchValue.toLowerCase()
    let errorMsg = this.state.errorMessage
    value = replaceSpaces(value)
    console.log('value', value)
    try {
      const response = await axios.get(`${apiUrl}/search/${value}`)
      console.log('res', response)
      if (response.data.Items.length > 0) {
        this.setState({ restaurants: response.data })
        this.setState({ searchValue: '' })
      } else {
        errorMsg = 'Sorry but we could not locate any restaurants.'
        document.getElementById('search-error-msg').innerHTML = errorMsg
      }
    } catch (error) {
      console.log('Your error is:', error.message)
    }
  }

  handleChange = event => {
    event.preventDefault()
    const searchValue = event.target.value
    console.log('sv', searchValue)
    this.setState({ searchValue })
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
          <div className='search'>
            <img src={Espresso} alt='Espresso Machine' />
            <div id='results'>
              <p >
                {' '}
                You can search through our list of restaurants by name or by
                neighborhood.
              </p>
              <input
                onChange={this.handleChange}
                type='text'
                value={searchValue}
                placeholder='Search'
              />
              <br />
              <button type='submit' onClick={this.handleSubmit}>
                Search
              </button>
              <p id='search-error-msg'></p>
            </div>
          </div>
        </article>
      )
    }
    return (
      <article>
        <div className='search'>
          <img src={Espresso} alt='Espresso Machine' />
          <div id='results'>
            <p id='text'>
              {' '}
              You can search through our list of restaurants by name or by
              neighborhood.
            </p>
            <input
              type='text'
              value={searchValue}
              onChange={this.handleChange}
              placeholder='Search'
            />
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
