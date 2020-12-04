import React, { Component } from 'react';
import FormInput from './../formInput/FormInput';
import CustomButton from './../customButton/CustomButton.component';

import './signUp.scss';
import { auth, createUser } from '../../firebase/firebase.utils';

export class SignUp extends Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password & Confirm Password doesn't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUser(user, { displayName });

      await this.setState({ displayName: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.log('err', error);
    }
  };
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I don't have an account</h2>
        <p className='text'>Sign up with Email & Password</p>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            required
            handleChange={this.handleInputChange}
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            required
            handleChange={this.handleInputChange}
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            required
            handleChange={this.handleInputChange}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            required
            handleChange={this.handleInputChange}
          />
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
