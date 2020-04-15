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

  handleRestaurantEdit = event => {
    event.preventDefault()
    this.setState({ isEditMode: true })
  }

  handleEditSave = async event => {
    event.preventDefault()
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
    console.log('pARAMS',params)
    await this.props.handleUpdate(params)
  }

  onChange = event => this.setState({ [event.target.name]: event.target.value })

  render () {
    console.log('State',this.state)
    return (
      <div className='updateRestaurants'>
        {this.state.isEditMode ? (
          <div id='updateRestaurants'>
            <p>Edit Restaurant Hours</p>
            <input
              type='text'
              id='editInputBox'
              value={this.props.hours}
              name='hours'
              placeholder='Enter updated hours'
              onChange={this.onChange}
            />
            <p>Edit Donations Link</p>
            <input
              id='editInputBox'
              type='text'
              value={this.props.donations}
              name='donations'
              placeholder='Enter donations link'
              onChange={this.onChange}
            />
            <p>Edit Website Link</p>
            <input
              id='editInputBox'
              type='text'
              name='website'
              placeholder='Enter updated website information'
              value={this.props.website}
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
