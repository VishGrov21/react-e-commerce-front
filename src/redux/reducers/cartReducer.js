import cartActionTypes from './../actions/cartActionTypes';
const initialState = {
  hidden: true,
  cartItems: [],
};

const addItemsToCartWithQuantity = (currentItemsArray, newItemObj) => {
  const checkItemExist = findTheItem(currentItemsArray, newItemObj);
  let newItemsArray = [];
  if (checkItemExist) {
    newItemsArray = currentItemsArray.map((item) => {
      return item.id === newItemObj.id ? { ...item, quantity: item.quantity + 1 } : item;
    });
  } else {
    newItemsArray = [...currentItemsArray, { ...newItemObj, quantity: 1 }];
  }
  return newItemsArray;
};

const clearItemFromReducer = (currentItemsArray, itemToBeRemoved) => {
  return currentItemsArray.filter((item) => {
    // filter() calls a provided callback function once for each element
    // in an array, and constructs a new array of all the values for which
    // callback returns a value that coerces to true.
    // filter() does not mutate the array on which it is called.
    console.log(item);
    return item.id !== itemToBeRemoved.id;
  });
};

const reduceItemFromCartReducer = (currentItemsArray, itemToBeReduced) => {
  const existingItem = findTheItem(currentItemsArray, itemToBeReduced);

  if (existingItem.quantity > 1) {
    return currentItemsArray.map((item) => {
      return item.id === itemToBeReduced.id ? { ...item, quantity: item.quantity - 1 } : item;
    });
  } else {
    return clearItemFromReducer(currentItemsArray, itemToBeReduced);
  }
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemsToCartWithQuantity(state.cartItems, payload),
      };
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromReducer(state.cartItems, payload),
      };
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: reduceItemFromCartReducer(state.cartItems, payload),
      };
    default:
      return state;
  }
};

function findTheItem(itemsArray, itemToFind) {
  return itemsArray.find((item) => {
    return item.id === itemToFind.id;
  });
}

export default cartReducer;
