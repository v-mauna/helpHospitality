import React, { Component, Fragment } from 'react'

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
      <div className='tile is-child box notification is-success'>
        {this.props.isAdmin && (
          <Fragment>
            <button
            type="submit"
              href='/'
              onClick={this.handleRestaurantEdit}
              className='product-edit-icon'
            >
              Edit
            </button>
            <button
              type='submit'
              onClick={(event) => this.props.handleDelete(this.props.id, event)}
              className='delete'
            >
              Delete
            </button>
          </Fragment>
        )}
        {this.state.isEditMode ? (
          <div>
            <p>Edit Restaurant Hours</p>
            <input
              className='input is-medium'
              type='text'
              name='updatedRestaurantHours'
              placeholder='Enter updated hours'
              value={this.state.updatedRestaurantHours}
              onChange={this.onChange}
            />
            <p>Edit Donations Link</p>
            <input
              className='input is-medium'
              type='text'
              name='updatedDonationsLink'
              placeholder='Enter donations link'
              value={this.state.updatedDonationsLink}
              onChange={this.onChange}
            />
            <button
              type='submit'
              className='button is-info is-small'
              onClick={this.handleEditSave}
            >
              save
            </button>
          </div>
        ) : (
          <div>
            <p className='restaurant-name'>{this.props.name}</p>
            <p className='restaurant-donations-link'>
              id: {this.props.donations}
            </p>
          </div>
        )}
      </div>
    )
  }
}
