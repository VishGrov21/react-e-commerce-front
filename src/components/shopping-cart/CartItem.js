import React from 'react';
import './cartItem.scss';

const CartItem = ({ imageUrl, name, price, quantity }) => {
  return (
    <div className='cart-item'>
      <img src={imageUrl} alt='item' />
      <div className='item-detail'>
        <p className='name'>{name}</p>
        <p className='price'>{`${quantity} x $${price}`}</p>
      </div>
    </div>
  );
};

export default CartItem;
