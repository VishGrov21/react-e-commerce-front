import React from 'react';
import './customButton.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
  return (
    <button
      className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${
        inverted ? 'lightBackground' : ''
      } custom-button`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
