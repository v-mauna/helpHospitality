import React, { Component } from 'react';
import Restaurant from './restaurant';
import axios from 'axios';
import './restaurantsList.css';
import Kitchen from '../images/kitchenOpen.jpg';

const config = require('../config.json');

export default class Restaurants extends Component {
	state = {
		newRestaurant: null,
		restaurants: []
	};

	fetchRestaurants = async () => {
		const apiUrl = config.api.invokeUrl;
		try {
			const response = await axios.get(`${apiUrl}/restaurants`);
			this.setState({ restaurants: response.data });
		} catch (error) {
			console.log('Your error is:', error);
		}
	};

	componentDidMount = () => {
		this.fetchRestaurants();
	};

	render() {
		const restaurantList = this.state.restaurants.Items
		console.log('RL',restaurantList)
		if(restaurantList){
		return (
			<div className="restaurants">
				<div id="kitchen">
					<img src={Kitchen} alt="Skyline" />
					<p id="text">
						{' '}If you're looking to help your favorite restaurant, or maybe even a few more, you're in the
						right place.{' '}
						 {restaurantList.map( restaurant => <Restaurant name={restaurant.name} />)
						}
						
					</p>
				</div>
			</div>
		)
		}
		return (
			<div> No restaurants available </div>
		)
	}
}
