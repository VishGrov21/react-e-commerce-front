import { call, all, takeLatest, put } from 'redux-saga/effects';
import { clearCart } from './../actions/cartActions';
import userActionTypes from './../actions/userActionTypes';

function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onUserSignOutClearCartSaga() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onUserSignOutClearCartSaga)]);
}
