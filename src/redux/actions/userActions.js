import userActionTypes from './userActionTypes';

export const googleSignInStart = () => {
  return {
    type: userActionTypes.GOOGLE_SIGN_IN_START,
  };
};

export const emailSignInStart = (emailAndPasswordObj) => {
  return {
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: {
      userDetails: emailAndPasswordObj,
    },
  };
};

export const signInSuccess = (user) => {
  return {
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: {
      user: user,
    },
  };
};

export const signInFailure = (error) => {
  return {
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const signOutStart = () => {
  return {
    type: userActionTypes.SIGN_OUT_START,
  };
};

export const signOutSuccess = (user) => {
  return {
    type: userActionTypes.SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = (error) => {
  return {
    type: userActionTypes.SIGN_OUT_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const signUpStart = (userObj) => {
  return {
    type: userActionTypes.SIGN_UP_START,
    payload: {
      userObj,
    },
  };
};

export const signUpSuccess = (user) => {
  return {
    type: userActionTypes.SIGN_UP_SUCCESS,
  };
};

export const signUpFailure = (error) => {
  return {
    type: userActionTypes.SIGN_UP_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const checkUserSession = (payload) => ({
  type: userActionTypes.CHECK_USER_SESSION,
});
