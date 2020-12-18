import React, { useState } from 'react';

import FormInput from './../formInput/FormInput';
import './signIn.scss';
import CustomButton from './../customButton/CustomButton.component';
import { googleSignInStart, emailSignInStart } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

const SignIn = ({ emailSignIn, googleSignIn }) => {
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignIn(email, password);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
    event.preventDefault();
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <p>Sign in with your email and password</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='email'
          required
          value={email}
          handleChange={handleInputChange}
          label='Email'
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          required
          value={password}
          handleChange={handleInputChange}
        />
        <div className='button-group'>
          <CustomButton type='submit'>Submit</CustomButton>
          <CustomButton type='button' onClick={googleSignIn} isGoogleSignIn>
            Sign-in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignIn: () => dispatch(googleSignInStart()),
  emailSignIn: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
