import { productActionTypes } from './productsActionsTypes';
import { firestore, addPropertiesToProductsCollection } from '../../firebase/firebase.utils';

export const fetchProductsDataStart = () => ({
  type: productActionTypes.FETCH_PRODUCTS_DATA_START,
});

export const fetchProductsDataSuccess = (payload) => ({
  type: productActionTypes.FETCH_PRODUCTS_DATA_SUCCESS,
  payload,
});

export const fetchProductsDataFailure = (payload) => ({
  type: productActionTypes.FETCH_PRODUCTS_DATA_FAILURE,
  payload,
});

export const fetchProductsDataAsync = () => {
  return (dispatch) => {
    const getProductsCollectionRef = firestore.collection('shopData');
    dispatch(fetchProductsDataStart());
    getProductsCollectionRef
      .get()
      .then((snapshot) => {
        const collectionsObj = addPropertiesToProductsCollection(snapshot);
        dispatch(fetchProductsDataSuccess(collectionsObj));
      })
      .catch((error) => fetchProductsDataFailure(error.message));
  };
};
