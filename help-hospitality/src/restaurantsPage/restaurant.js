import React, { Component, Fragment } from 'react';
import './restaurant.css';
import {replaceHyphens} from '../helperFunctions'

export default class Restaurant extends Component {
  state = {
    isEditMode: false,
    updatedHours: this.props.hours,
    updatedGoFundMe: this.props.goFundMe,
  };

  handleRestaurantEdit = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  };

  handleEditSave = (event) => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateRestaurant(
      this.props.id,
      this.state.updatedHours,
      this.state.updatedGoFundMe
    );
  };

  onAddRestaurantHourChange = (event) =>
    this.setState({ updatedHours: event.target.value });
  onAddGoFundMeChange = (event) =>
    this.setState({ updatedGoFundMe: event.target.value });

  render() {
    return (
      <article>
        <div className="restaurant">
          {this.props.isAdmin && (
            <Fragment>
              <a
                href="/"
                onClick={this.handleRestaurantEdit}
                className="product-edit-icon"
              />
              <button
              type="submit"
                onClick={(event) =>
                  this.props.handleDeleteRestaurant(this.props.id, event)
                }
                className="delete"
              />
            </Fragment>
          )}
          {this.state.isEditMode ? (
            <div>
              <p>Edit Hours<br/>
              <input
                className="input is-medium"
                type="text"
                placeholder="Enter hours"
                value={this.state.updatedHours}
                onChange={this.onAddRestaurantHourChange}
              />
              id: {this.props.id}</p>
              <button
                type="submit"
                className="button is-info is-small"
                onClick={this.handleEditSave}
              >
                save
              </button>
            </div>
          ) : (
            <div id="restaurant">
              <a href={`/restaurants/${this.props.name}`}>
              <div className="restaurantInfo">
                <p>
                  Name: {this.props.name}
                  <br />
                  Address: {this.props.address}
                  <br />
                  City: {this.props.city}
                  <br />
                  Hours: {this.props.hours}
                  <br />
                  Website: <a target="_blank" rel="noopener noreferrer" href={`http://wwww.${this.props.website}`}>
                  {this.props.website}
                  </a>
                  <br />
                  Bio: {this.props.bio}
                  <br/>
                  Neighborhood: {this.props.neighborhood}
                  <br />
                  Donations Link:{' '}
                  <a target="_blank" rel="noopener noreferrer" href={`http://wwww.${this.props.donations}`}>
                    {this.props.donations}
                  </a>
                </p>
              </div>
              </a>
            </div>
          )}
        </div>
      </article>
    );
  }
}
