import {
  LOGIN_PAGE_INIT,
  LOGIN_PAGE_CHANGE_EMAIL,
  LOGIN_PAGE_CHANGE_PASSWORD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_PAGE_SHOW_LOADING,
  LOGIN_VALIDATION_ERROR,
  LOGIN_SET_OAUTH_CONFIG
} from "./constants";
import history from "../../utils/history";
import { loginUser, OAuthLogin, getOAuthConfig } from "./loginApi";
import schema from './validations';

export const setOAuthConfig = () => {
  return async (dispatch) => {
    try {
      const { data: { google, facebook }} = await getOAuthConfig();
      dispatch(setConfig(google, facebook));
    }
    catch (err) {
      dispatch(setConfig(null, null));
    }
  }
}

export const onGoogleLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const token = data.tokenObj.access_token;
      const user = await OAuthLogin('google', token);
      dispatch(userLoggedin(user));
      history.push("/");
    }
    catch (err) {
      dispatch(userLoginError(err));
    }
  }
}

export const onFacebookLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const token = data.accessToken;
      if(!token) {
        var err = { response: { data: 'Unable to Login with Facebook' } }
        return dispatch(userLoginError(err));
      }
      const user = await OAuthLogin('facebook', token);
      dispatch(userLoggedin(user));
      history.push("/");
    }
    catch (err) {
      dispatch(userLoginError(err));
    }
  }
}

export const onSubmit = (userDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(userDetails);
      if(!isValid) {
        const err = await schema.validate(userDetails).catch(err => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading());
      const user = await loginUser(userDetails);
      dispatch(userLoggedin(user));
      history.push("/");
    } catch (err) {
      dispatch(userLoginError(err));
    }
  };
};

const setConfig = (google, facebook) => ({
  type: LOGIN_SET_OAUTH_CONFIG,
  google,
  facebook
});

const validationFailed = (payload) => ({
  type: LOGIN_VALIDATION_ERROR,
  payload
});

const showLoading = () => ({
  type: LOGIN_PAGE_SHOW_LOADING,
});

const userLoggedin = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const userLoginError = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginInit = (dispatch) => () => {
  dispatch({
    type: LOGIN_PAGE_INIT
  });
}

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: LOGIN_PAGE_CHANGE_EMAIL,
    payload,
  });
};

export const changePassword = (dispatch) => (payload) => {
  dispatch({
    type: LOGIN_PAGE_CHANGE_PASSWORD,
    payload,
  });
};
