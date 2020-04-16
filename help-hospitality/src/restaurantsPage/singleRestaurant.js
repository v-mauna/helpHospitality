import React, { Component } from 'react'
import City from '../images/youAreHere.jpg'
import axios from 'axios'
import { replaceSpaces,replaceHyphens } from '../helperFunctions'
import './singleRestaurant.css'

const config = require('../config.json')

export default class SingleRestaurant extends Component {
  constructor () {
    super()
    this.state = {
      restaurant: [],
    }
    this.fetchRestaurant = this.fetchRestaurant.bind(this)
  }

  fetchRestaurant = async () => {
    const apiUrl = config.api.invokeUrl
    let value = this.props.match.params.name.toLowerCase()
    value = replaceSpaces(value)
    try {
      const response = await axios.get(`${apiUrl}/search/${value}`)
      this.setState({ restaurant: response.data })
    } catch (error) {
      console.log('Your error is:', error.message)
    }
  }

  componentDidMount(){
      this.fetchRestaurant()
  }
  render () {
      const restaurantInfo = this.state.restaurant.Items
      if(restaurantInfo){
    return (
      <section>
        <div className='singleRestaurant'>
          <div id='singleRestaurantInfo'>
          {restaurantInfo.map((restaurant)=>(
              <div key={restaurant.id} id="singleRestaurant">
              <div id="singleRestaurantText">
                <p>
                  Name: {replaceHyphens(restaurant.name)}
                  <br />
                  Address: {restaurant.address}
                  <br />
                  City: {restaurant.city}
                  <br />
                  Hours: {restaurant.hours}
                  <br />
                  Website: <a href={`http://wwww.${restaurant.website}`}>
                    {' '}
                    {restaurant.website}
                  </a>
                  <br />
                  Bio: {restaurant.bio}
                  <br/>
                  Neighborhood: {replaceHyphens(restaurant.neighborhood)}
                  <br />
                  Donations Link:{' '}
                  <a href={`http://wwww.${restaurant.donations}`}>
                    {' '}
                    {restaurant.donations}
                  </a>
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
      )}return(
        <section>
        <div className='singleRestaurant'>
          <img src={City} alt='City Backdrop' />
        </div>
      </section>

      )
      }
  }


