import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      restaurantName: '',
      address: '',
      city: '',
      zip: '',
      neighborhood: '',
      goFundMe: '',
      hours: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newUser = this.state
    this.props.createUser(newUser)
    this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        restaurantName: '',
        address: '',
        city: '',
        zip: '',
        neighborhood: '',
        goFundMe: '',
        hours: '',
        description: ''
    })
  }
  render() {
    return (
      <div className="reg-page">
        <div className="reg-form">
          <h2>create an account</h2>
          <div id="registerUser">
            <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
              <label htmlFor="firstName">
                <p>first name</p>
              </label>
              <input
                value={this.state.firstName}
                onChange={this.handleChange}
                name="firstName"
                type="text"
              />
              <label htmlFor="lastName">
                <p>last name</p>
              </label>
              <input
                value={this.state.lastName}
                onChange={this.handleChange}
                name="lastName"
                type="text"
              />
              <label htmlFor="email">
                <p>e-mail</p>
              </label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                type="text"
              />
              <label value={this.state.password} htmlFor="password">
                <p>password</p>
              </label>
              <input
                name="password"
                onChange={this.handleChange}
                type="password"
              />
            </form>
            <button type="submit" onClick={this.handleSubmit}>
              create account
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
