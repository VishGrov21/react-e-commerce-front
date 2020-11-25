import React from 'react';
import { ReactComponent as ShoppingBag } from '../../assets/images/shopping-bag.svg';
import './shoppingCart.scss';
import { cartActionHidden } from './../../redux/actions/cartActions';
import { connect } from 'react-redux';
import { selectCartItemsQuantity } from '../../redux/selectors/cartSelector';

const ShoppingCart = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingBag className='shopping-icon' />
      <p className='item-count'>{itemCount}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(cartActionHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsQuantity(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
