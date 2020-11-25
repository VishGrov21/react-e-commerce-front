import cartActionTypes from './cartActionTypes';

export const cartActionHidden = () => {
  return {
    type: cartActionTypes.TOGGLE_CART_HIDDEN,
    payload: {},
  };
};

export const addItemToCart = (item) => {
  return {
    type: cartActionTypes.ADD_ITEM,
    payload: item,
  };
};

export const clearItemFromCartAction = (item) => {
  return {
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item,
  };
};

export const reduceItemFromCartAction = (item) => {
  return {
    type: cartActionTypes.REMOVE_ITEM,
    payload: item,
  };
};
