import { productActionTypes } from '../actions/productsActionsTypes';
import { firestore, addPropertiesToProductsCollection } from '../../firebase/firebase.utils';

// It listens to every action of specific type that we pass to it
import { takeEvery, call, put } from 'redux-saga/effects';

import { fetchProductsDataSuccess, fetchProductsDataFailure } from '../actions/productsActions';

// The purpose of sagas is to run the sagas run concurrently

export function* fetchProductsDataAsync() {
  // All generator functions must have yield
  // for every yield we're throwing the control back to saga middleware
  try {
    const getProductsCollectionRef = firestore.collection('shopData');
    const snapshot = yield getProductsCollectionRef.get();
    // call is the effect inside our generator function that invokes the method
    // call takes 1st argument as method or function and subsequent arguments are the parameters
    // to the function
    // we want to yield this in-case call takes longer than expected.
    // As we're yielding the call, it allows to defer the control back to the saga middleware
    const collectionsObj = yield call(addPropertiesToProductsCollection, snapshot);

    // put is the saga effect for creating the action, its similar to dispatch just that
    // we need to yield it
    yield put(fetchProductsDataSuccess(collectionsObj));
  } catch (error) {
    yield put(fetchProductsDataFailure(error.message));
  }
}

export function* fetchProductsDataStart() {
  // The 1st parameter is the action and 2nd parameter is the other generator function.

  // takeEvery which is a saga effect creates a non-blocking call in order to not stop our application
  // to continue running other sagas or whatever user wants to do
  yield takeEvery(productActionTypes.FETCH_PRODUCTS_DATA_START, fetchProductsDataAsync);
}
