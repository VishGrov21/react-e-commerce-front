import { productActionTypes } from './../actions/productsActionsTypes';
const initialState = {
  collections: null,
  isFetching: true,
  errorMessage: null,
};

const shopDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case productActionTypes.FETCH_PRODUCTS_DATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case productActionTypes.FETCH_PRODUCTS_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: payload,
      };
    case productActionTypes.FETCH_PRODUCTS_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default shopDataReducer;
