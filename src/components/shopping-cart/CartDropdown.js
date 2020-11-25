import React from 'react';
import CustomButton from './../customButton/CustomButton';
import './cartDropdown.scss';
import { connect } from 'react-redux';
import CartItem from './CartItem.js';
import { selectCartItems } from '../../redux/selectors/cartSelector';
import { withRouter } from 'react-router-dom';
import { cartActionHidden } from '../../redux/actions/cartActions';

const CartDropdown = ({ toggleCartDropdown, cartItemsArray, history, hideCartDropDown }) => {
  return (
    <div className={`${toggleCartDropdown ? 'not-display' : ''} dropdown-container`}>
      {cartItemsArray.length ? (
        <div className='items'>
          {cartItemsArray.map((item) => {
            console.log(item);
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
      ) : (
        <p className='empty-cart'>Your cart is empty</p>
      )}
      <CustomButton
        type='button'
        onClick={() => {
          hideCartDropDown();
          history.push('/checkout');
        }}>
        Go to checkout
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  toggleCartDropdown: state.cart.hidden,
  cartItemsArray: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideCartDropDown: () => dispatch(cartActionHidden()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));
