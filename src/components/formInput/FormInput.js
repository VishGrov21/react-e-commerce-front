import React from 'react';
import './formInput.scss';

const FormInput = ({ label, handleChange, ...otherProps }) => {
  return (
    <div className='input-group'>
      <input className='form-input' {...otherProps} onChange={handleChange} />
      {label ? (
        <label
          className={`${otherProps.value.length ? 'shrink' : ''} 
                  form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
