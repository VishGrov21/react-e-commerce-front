import SHOP_DATA from './shopPage.data';
const initialState = {
  collections:SHOP_DATA,
};

const shopDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default shopDataReducer;
