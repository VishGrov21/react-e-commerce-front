import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './../actions/userActionTypes';
import { auth, googleProvider, createUser, setCurrentUser } from './../../firebase/firebase.utils';
import {
  emailSignInStart,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from './../actions/userActions';

function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield signInWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithUserAuth(userAuth) {
  try {
    const userRef = yield call(createUser, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* emailSignIn({
  payload: {
    userDetails: { email, password },
  },
}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInWithUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* isAuthStateChanged() {
  try {
    const userAuth = yield setCurrentUser();
    if (!userAuth) return;
    yield signInWithUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* userSignOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* userSignUp({ payload: { userObj } }) {
  const { displayName, email, password } = userObj;
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);

    yield createUser(user, { displayName });
    yield put(signUpSuccess());
    yield put(emailSignInStart({ email, password }));
    // yield call(onEmailSignIn, { email, password });
    // yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, { email, password });
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onUserSignUp(userObj) {
  yield takeLatest(userActionTypes.SIGN_UP_START, userSignUp);
}

export function* onEmailSignIn(emailPasswordObj) {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* onGoogleSignIn() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isAuthStateChanged);
}

function* onUserSignOut() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, userSignOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onUserSignOut),
    call(onUserSignUp),
  ]);
}
