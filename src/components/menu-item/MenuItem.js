import React from 'react';
import { withRouter } from 'react-router-dom';
import './menuItem.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  const onClickMenuHandler = () => {
    history.push(`${match.url}${linkUrl}`);
  };
  return (
    <div className={`menu-item ${size}`}>
      <div
        className='backgroundImageStyle'
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={onClickMenuHandler}></div>
      <div className='content'>
        <h1 className='title'>{title}</h1>
        <span className='sub-title'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
