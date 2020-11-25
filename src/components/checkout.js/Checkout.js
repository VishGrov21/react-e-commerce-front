import React from 'react';
import { createStructuredSelector } from 'reselect';
import './checkout.scss';
import {
  selectCartItems,
  selectCartItemsQuantity,
  selectCartItemsTotalPrice,
} from './../../redux/selectors/cartSelector';
import { connect } from 'react-redux';
import {
  addItemToCart,
  clearItemFromCartAction,
  reduceItemFromCartAction,
} from './../../redux/actions/cartActions';
import StripeCheckoutButton from '../stripeButton/StripeCheckoutButton';

const currentDate = new Date();
const tomorrow = new Date();
tomorrow.setDate(currentDate.getDate() + 1);

const Checkout = ({
  cartItemsArray,
  itemCount,
  totalPrice,
  removeItemFromCart,
  addItem,
  reduceItemFromCart,
}) => {
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <p className='heading'>Product</p>
        <p className='heading'>Description</p>
        <p className='heading'>Quantity</p>
        <p className='heading'>Price</p>
        <p className='heading'>Remove</p>
      </div>
      {cartItemsArray.length
        ? cartItemsArray.map((item) => (
            <div className='items-container' key={item.id}>
              <img src={item.imageUrl} alt='item' />
              <p className='item name'>{item.name}</p>
              <p className='item quantity'>
                <span className='arrow' onClick={() => reduceItemFromCart(item)}>
                  &#10094;
                </span>
                {item.quantity}
                <span className='arrow' onClick={() => addItem(item)}>
                  &#10095;
                </span>
              </p>
              <p className='item price'>${item.price}</p>
              <p className='item remove' onClick={() => removeItemFromCart(item)}>
                &#10005;
              </p>
            </div>
          ))
        : null}
      <div className='total-container'>
        <p className='total'>Total: $ {totalPrice}</p>
        <br />
        <div className='card-details'>
          <p>* Please use following details *</p>
          <p>Card Number: 4242-4242-4242</p>
          <p>Expiry: {`${tomorrow.getMonth() + 1} / ${tomorrow.getFullYear() - 2000}`}</p>
          <p>CVV:123</p>
        </div>
        <StripeCheckoutButton price={totalPrice} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsArray: selectCartItems,
  itemsCount: selectCartItemsQuantity,
  totalPrice: selectCartItemsTotalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItemToCart(item)),
  reduceItemFromCart: (item) => dispatch(reduceItemFromCartAction(item)),
  removeItemFromCart: (item) => dispatch(clearItemFromCartAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
