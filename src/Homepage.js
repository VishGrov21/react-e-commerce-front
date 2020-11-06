import React from 'react';
import './homepage.styles.scss';

const Homepage = (props) => {
  return (
    <div className='homepage'>
      <div className='directory-menu'>
        <div className='menu-item'>
          <div className='content'>
            <div className='title'>HAT</div>
            <div className='sub-title'>SHOP NOW</div>
          </div>
        </div>
        <div className='menu-item'>
          <div className='content'>
            <div className='title'>JACKETS</div>
            <div className='sub-title'>SHOP NOW</div>
          </div>
        </div>
        <div className='menu-item'>
          <div className='content'>
            <div className='title'>SNEAKERS</div>
            <div className='sub-title'>SHOP NOW</div>
          </div>
        </div>
        <div className='menu-item'>
          <div className='content'>
            <div className='title'>MEN</div>
            <div className='sub-title'>SHOP NOW</div>
          </div>
        </div>
        <div className='menu-item'>
          <div className='content'>
            <div className='title'>WOMEN</div>
            <div className='sub-title'>SHOP NOW</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
