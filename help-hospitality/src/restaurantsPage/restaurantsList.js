import React, { Component, Fragment } from 'react';
import Restaurant from './restaurant';
import axios from 'axios';
import './restaurantsList.css';
import Kitchen from '../images/kitchenOpen.jpg';

const config = require('../config.json');

export default class Restaurants extends Component {
	state = {
		newproduct: null,
		restaurants: []
	};

	fetchProducts = () => {
		// add call to AWS API Gateway to fetch products here
		// then set them in state
	};

	componentDidMount = () => {
		this.fetchProducts();
	};

	render() {
		return (
			<div className="restaurants">
				<div id="kitchen">
					<img src={Kitchen} alt="Skyline" />
					<p id="text">
						{' '}If you're looking to help your favorite restaurant, or maybe even a few more, you're in the
						right place.{' '}
					</p>
				</div>
			</div>
		);
	}
}
