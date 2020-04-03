import React from 'react';
import Table from '../../images/table.jpg';
import './signUp.css';
import { Auth } from 'aws-amplify';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmpassword: '',
			errors: {
				cognito: null,
				blankfield: false,
				passwordmatch: false
			}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	clearErrorState = () => {
		this.setState({
			errors: {
				cognito: null,
				blankfield: false,
				passwordmatch: false
			}
		});
	};
	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		// Form validation
		this.clearErrorState();
		const { email, password, username, firstName, lastName } = this.state;
		try {
			const signUpResponse = await Auth.signUp({
				username,
				password,
				attributes: {
					name: firstName,
					family_name: lastName,
					email,
				}
			});
			this.props.history.push('/restaurants');
			console.log(signUpResponse);
		} catch (error) {
			let err = null;
			!error.message ? (err = { message: error }) : (err = error);
			this.setState({
				errors: {
					...this.state.errors,
					cognito: error
				}
			});
			console.log('err', err);
		}
	};

	render() {
		return (
			<div className="signUp">
				<div className="signUpForm">
					<img id="table" src={Table} alt="Table" />
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
								placeholder="Enter first name"
								type="text"
							/>
							<label htmlFor="lastName">
								<p>last name</p>
							</label>
							<input
								value={this.state.lastName}
								onChange={this.handleChange}
								placeholder="Enter last name"
								name="lastName"
								type="text"
							/>
							<label htmlFor="email">
								<p>email</p>
							</label>
							<input
								value={this.state.email}
								onChange={this.handleChange}
								name="email"
								placeholder="Enter your email"
								type="text"
							/>
							<label htmlFor="username">
								<p>username</p>
							</label>
							<input
								value={this.state.username}
								onChange={this.handleChange}
								name="username"
								placeholder="Enter your username"
								type="text"
							/>
							<label value={this.state.password} htmlFor="password">
								<p>password</p>
							</label>
							<input
								name="password"
								onChange={this.handleChange}
								type="password"
								placeholder="Enter your password"
							/>
							<label value={this.state.password} htmlFor="password">
								<p>Confirm password</p>
							</label>
							<input
								name="confirm password"
								onChange={this.handleChange}
								type="password"
								placeholder="Confirm password"
							/>
						</form>
						<button type="submit" onClick={this.handleSubmit}>
							create account
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
