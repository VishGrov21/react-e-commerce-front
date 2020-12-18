import React, { useState } from 'react';
import FormInput from './../formInput/FormInput';
import CustomButton from './../customButton/CustomButton.component';

import './signUp.scss';
import { signUpStart } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

const SignUp = ({ userSignUp }) => {
  const [userSignUpForm, setUSerSignUpForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userSignUpForm;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUSerSignUpForm({ ...userSignUpForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password & Confirm Password doesn't match");
      return;
    }
    userSignUp(displayName, email, password);
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I don't have an account</h2>
      <p className='text'>Sign up with Email & Password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          label='Name'
          required
          handleChange={handleInputChange}
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          label='Email'
          required
          handleChange={handleInputChange}
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          label='Password'
          required
          handleChange={handleInputChange}
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          label='Confirm Password'
          required
          handleChange={handleInputChange}
        />
        <CustomButton type='submit'>Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userSignUp: (displayName, email, password) =>
    dispatch(signUpStart({ displayName, email, password })),
});

export default connect(null, mapDispatchToProps)(SignUp);
