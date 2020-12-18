import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart.sagas';

import { fetchProductsDataStart } from './shop.sagas';
import { userSagas } from './user.sagas';

export default function* rootsaga() {
  // all will take an array of sagas and will run concurrently
  yield all([call(fetchProductsDataStart), call(userSagas), call(cartSagas)]);
}
