import React, { Component } from 'react'
import Restaurant from './restaurant'
import axios from 'axios'
import './restaurantsList.css'
import Kitchen from '../images/kitchenOpen.jpg'

const config = require('../config.json')

export default class Restaurants extends Component {
  state = {
    restaurants: [],
  }

  fetchRestaurants = async () => {
    const apiUrl = config.api.invokeUrl
    try {
      const response = await axios.get(`${apiUrl}/restaurants`)
      this.setState({ restaurants: response.data })
    } catch (error) {
      console.log('Your error is:', error)
    }
  }

  componentDidMount = () => {
    this.fetchRestaurants()
  }

  render () {
    const restaurantList = this.state.restaurants.Items
    if (restaurantList && restaurantList.length>0) {
      return (
        <article>
          <div className='restaurants'>
            <img src={Kitchen} alt='Kitchen Open Sign' />
            <div id='restaurants'>
              <p id='text'>
                {' '}
                Our local restaurants need our help. Let's help keep our
                favorite spaces alive through donating, purchasing gift cards and merchandise, or by ordering our favorite food and drinks. 
              </p>
              <div id='restaurantBlock'>
                {restaurantList.map(restaurant => (
                  <Restaurant
                    name={restaurant.name}
                    address={restaurant.address}
                    hours={restaurant.hours}
                    city={restaurant.city}
                    neighborhood={restaurant.neighborhood}
                    donations={restaurant.donations}
                    zip={restaurant.zip}
                    bio={restaurant.bio}
                    key={restaurant.id}
                    website={restaurant.website}
                  />
                ))}
              </div>
            </div>
          </div>
        </article>
      )
    }
    return (
      <div className='restaurants'>
        <div id='kitchen'>
          <img src={Kitchen} alt='Kitchen Open Sign' />
          <p id='noRestaurantsText'> We are currently working on adding restaurants to our list.</p>
        </div>
      </div>
    )
  }
}
