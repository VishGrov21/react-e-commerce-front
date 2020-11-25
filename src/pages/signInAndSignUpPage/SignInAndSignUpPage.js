import React from 'react';
import SignUp from '../../components/signUp/SignUp';
import SignIn from './../../components/signIn/SignIn';
import './signInAndSignUpPage.scss';

const SignInAndSignUpPage = () => {
  return (
    <div className='sign-in-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
