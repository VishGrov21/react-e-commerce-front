import React, { Component } from 'react';
import FormInput from './../formInput/FormInput';
import './signIn.scss';
import CustomButton from './../customButton/CustomButton';
import { auth, signInWIthGoogle } from '../../firebase/firebase.utils';

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ ...this.state, email: '', password: '' });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
    event.preventDefault();
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <p>Sign in with your email and password</p>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='email'
            required
            value={this.state.email}
            handleChange={this.handleInputChange}
            label='Email'
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
            required
            value={this.state.password}
            handleChange={this.handleInputChange}
          />
          <div className='button-group'>
            <CustomButton type='submit'>Submit</CustomButton>
            <CustomButton onClick={signInWIthGoogle} isGoogleSignIn>
              Sign-in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
