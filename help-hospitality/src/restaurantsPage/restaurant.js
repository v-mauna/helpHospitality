import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './restaurant.css';

export default class Restaurant extends Component {
	state = {
		isEditMode: false,
		updatedHours: this.props.hours,
		updatedGoFundMe: this.props.goFundMe
	};

	handleRestaurantEdit = event => {
		event.preventDefault();
		this.setState({ isEditMode: true });
	};

	handleEditSave = event => {
		event.preventDefault();
		this.setState({ isEditMode: false });
		this.props.handleUpdateRestaurant(this.props.id, this.state.updatedHours, this.state.updatedGoFundMe);
	};

	onAddRestaurantHourChange = event => this.setState({ updatedHours: event.target.value });
	onAddGoFundMeChange = event => this.setState({ updatedGoFundMe: event.target.value });

	render() {
		return (
			<div className="restaurant">
				{this.props.isAdmin &&
					<Fragment>
						<a href="/" onClick={this.handleRestaurantEdit} className="product-edit-icon">
							<FontAwesomeIcon icon="edit" />
						</a>
						<button
							onClick={event => this.props.handleDeleteRestaurant(this.props.id, event)}
							className="delete"
						/>
					</Fragment>}
				{this.state.isEditMode
					? <div>
							<p>Edit Hours</p>
							<input
								className="input is-medium"
								type="text"
								placeholder="Enter hours"
								value={this.state.updatedHours}
								onChange={this.onAddRestaurantHourChange}
							/>
							<p className="restaurant-id">
								id: {this.props.id}
							</p>
							<button type="submit" className="button is-info is-small" onClick={this.handleEditSave}>
								save
							</button>
						</div>
					: <div id="restaurant">
							<div className="restaurantInfo">
								<p>
									Name: {this.props.name}
								</p>
								<p>
									Address: {this.props.address}
								</p>
								<p>
									City: {this.props.city}
								</p>
								<p>
									Zip: {this.props.zip}
								</p>
								<p>
									Hours: {this.props.hours}
								</p>
								<p>
									Neighborhood: {this.props.neighborhood}
								</p>
								<p>
									Donations Link: <a href={`http://wwww.${this.props.donations}`}> {this.props.donations}</a>
								</p>
                <div id="divider"/>
							</div>
              
						</div>}
			</div>
		);
	}
}
