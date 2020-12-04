import React from 'react';
import './withSpinner.scss';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherprops }) => {
  return isLoading ? (
    <div className='loading-overlay'>
      <div className='spinner'>
        <div className='sk-folding-cube'>
          <div className='sk-cube1 sk-cube'></div>
          <div className='sk-cube2 sk-cube'></div>
          <div className='sk-cube4 sk-cube'></div>
          <div className='sk-cube3 sk-cube'></div>
        </div>
      </div>
    </div>
  ) : (
    <WrappedComponent {...otherprops} />
  );
};

export default WithSpinner;
