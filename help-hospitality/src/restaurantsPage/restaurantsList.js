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
			<article>
			<div className="restaurants">
			<img src={Kitchen} alt="Kitchen" />
				<div id="restaurants">
					<p id="text">
						{' '}Our local restaurants need our help. Let's help keep our favorite spaces alive by donating and if they're open, by ordering a meal or two for yourself or maybe for our healthcare workers that are on the frontline and who need all the support they can get. {' '}
						 {restaurantList.map( restaurant => <Restaurant name={restaurant.name}
						 address={restaurant.address} hours={restaurant.hours} city={restaurant.city}
						 neighborhood={restaurant.neighborhood} donations={restaurant.donations} zip={restaurant.zip} bio={restaurant.bio} key={restaurant.name}/>)
						}
						
					</p>
				</div>
			</div>
			</article>
		)
		}
		return (
			<div className="restaurants"> 
			<div id="kitchen">
			<img src={Kitchen} alt="Skyline" />
			<p id="restaurantText">
						{' '}{' '}
						No restaurants are available at this time.</p> 
			</div>
			</div>
		)
	}
}
