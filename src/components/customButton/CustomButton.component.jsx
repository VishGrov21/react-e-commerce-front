import React from 'react';
import { CustomButtonStyles } from './customButton.styles';

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <CustomButtonStyles {...otherProps}>
      {children}
    </CustomButtonStyles>
  );
};

export default CustomButton;
