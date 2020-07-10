import React, { Component } from 'react'
import './editRestaurant.css'
import { replaceHyphens } from '../helperFunctions'

export default class RestaurantEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditMode: false,
      hours: this.props.hours,
      donations: this.props.donations,
      website: this.props.website,
      name: this.props.name,
      address: this.props.address,
      city: this.props.city,
      neighborhood: this.props.neighborhood,
      bio: this.props.bio,
      id: this.props.id,
      username: this.props.username
    }
    this.handleRestaurantEdit = this.handleRestaurantEdit.bind(this)
  }

  handleRestaurantEdit = evt => {
    evt.preventDefault()
    this.setState({ isEditMode: true })
  }

  handleEditSave = async event => {
    this.setState({ isEditMode: false })
    let {
      hours,
      website,
      donations,
      bio,
      name,
      city,
      address,
      id,
      neighborhood,
      username
    } = this.state
    console.log('state', this.state)
    let params = {
      website,
      hours,donations,
      bio,
      name,
      city,
      address,
      neighborhood,
      id,
      username
    }
    await this.props.handleUpdate(params)
  }

  handleChange = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render () {
    return (
      <div className='updateRestaurants'>
        {this.state.isEditMode ? (
          <div id='updateRestaurants'>
            <p>Edit Restaurant Hours</p>
            <input
              type='text'
              id='editInputBox'
              name='hours'
              placeholder='Enter updated hours'
              onChange={this.handleChange}
            />
            <p>Edit Donations Link</p>
            <input
              id='editInputBox'
              type='text'
              name='donations'
              placeholder='Enter donations link'
              onChange={this.handleChange}
            />
            <p>Edit Website Link</p>
            <input
              id='editInputBox'
              type='text'
              name='website'
              placeholder='Enter updated website information'
              onChange={this.handleChange}
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
            <p>Name: {replaceHyphens(this.props.name)}</p>
            <p>Address: {this.props.address}</p>
            <p>City: {this.props.city}</p>
            <p>Neighborhood: {replaceHyphens(this.props.neighborhood)}</p>
            <p>Hours: {this.props.hours}</p>
            <p>Bio: {this.props.bio}</p>
            <p>
              Website:
              <a href={`http://wwww.${this.props.donations}`}>
                {' '}
                {this.props.website}
              </a>
            </p>
            Donations:{' '}
            <a href={`http://wwww.${this.props.donations}`}>
              {' '}
              {this.props.donations}
            </a>
            <br />
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
