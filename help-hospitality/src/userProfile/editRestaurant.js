import React, { Component } from 'react'
import './editRestaurant.css'

export default class RestaurantEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditMode: false,
      updatedRestaurantHours: this.props.hours,
      updatedDonationsLink: this.props.donations,
    }
    this.handleRestaurantEdit = this.handleRestaurantEdit.bind(this)
  }

  handleRestaurantEdit = event => {
    event.preventDefault()
    this.setState({ isEditMode: true })
  }

  handleEditSave = event => {
    event.preventDefault()
    this.setState({ isEditMode: false })
    const updatedHours = this.state.updatedRestaurantHours
    const updatedDonationsLink = this.state.updatedDonationsLink
    this.props.handleUpdate(this.props.id, updatedHours, updatedDonationsLink)
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value })

  render () {
    return (
      <div className='updateRestaurants'>
        {this.state.isEditMode ? (
          <div id='updateRestaurants'>
            <p>Edit Restaurant Hours</p>
            <input
              type='text'
              id='editInputBox'
              name='updatedRestaurantHours'
              placeholder='Enter updated hours'
              onChange={this.onChange}
            />
            <p>Edit Donations Link</p>
            <input
              id='editInputBox'
              type='text'
              name='updatedDonationsLink'
              placeholder='Enter donations link'
              onChange={this.onChange}
            />
            <br />
            <button
              type='submit'
              onClick={this.handleEditSave}
              id='editRestaurantBtn'
            >
              save
            </button>
            <button
              type='submit'
              href='/'
              id='editRestaurantBtn'
              onClick={this.handleRestaurantEdit}
            >
              Edit
            </button>
            <button
              type='submit'
              id='editRestaurantBtn'
              onClick={event => this.props.handleDelete(this.props.id, event)}
              className='delete'
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <p>Name: {this.props.name}</p>
            <p>Address: {this.props.address}</p>
            <p>City: {this.props.city}</p>
            <p>Neighborhood: {this.props.neighborhood}</p>
            <p>Hours: {this.props.hours}</p>
            <p>Bio: {this.props.bio}</p>
            Donations:{' '}
                  <a href={`http://wwww.${this.props.donations}`}>
                    {' '}
                    {this.props.donations}
                  </a>
                  <br/>
            <button
              type='submit'
              href='/'
              id='editRestaurantBtn'
              onClick={this.handleRestaurantEdit}
            >
              Edit
            </button>
            <button
              type='submit'
              id='editRestaurantBtn'
              onClick={event => this.props.handleDelete(this.props.id, event)}
              className='delete'
            >
              Delete
            </button>
          </div>
        )}
      </div>
    )
  }
}
