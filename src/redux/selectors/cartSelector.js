import { createSelector } from 'reselect';

// extract the cart property from the state
const selectCart = (state) => state.cart;

// The createselector will take in 2 parameters, inputArraySelectors & returnFunction.
// Takes one or more selectors, or an array of selectors, computes their values and
// passes them as arguments to resultFunc.
// Here selectCartItems would take cart property as first input parameter (selectCart)
// the value is passed to resultFunction.
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

// Here selectCartItems would contain and cartItemsArray on which we can run reduce function
// and obtain accumulatedQuantity of it.
export const selectCartItemsQuantity = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, currentItem) => accumulatedQuantity + currentItem.quantity,
    0,
  ),
);

export const selectCartItemsTotalPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumaulatedPrice, currentItem) =>
      accumaulatedPrice + currentItem.price * currentItem.quantity,
    0,
  ),
);
