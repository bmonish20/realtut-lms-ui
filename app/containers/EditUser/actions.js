import {
  EDIT_USER_PAGE_INIT,
  EDIT_USER_CHANGE_FIRST_NAME,
  EDIT_USER_CHANGE_LAST_NAME,
  EDIT_USER_CHANGE_EMAIL,
  EDIT_USER_CHANGE_PHONE_NUM,
  EDIT_USER_CHANGE_ROLE,
  EDIT_USER_SHOW_LOADING,
  EDIT_USER_VALIDATION_ERROR,
  SET_USER_DETAILS,
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import schema from "./validations";
import { editUserApi } from "./editUserApi";
import { fetchUserDetails } from "../Users/usersApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (id, userDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(userDetails);
      if (!isValid) {
        const err = await schema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading());
      await editUserApi(id, userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User updated successfully",
      });
      history.push("/users");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update the user",
      });
    }
  };
};

export const disableUser = (id, userDetails) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await editUserApi(id, userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User status changed successfully",
      });
      history.push("/users");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change the status of the user",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchUserDetails(id);
      dispatch(setUserDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch user details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: EDIT_USER_VALIDATION_ERROR,
  payload,
});

const setUserDetails = (payload) => ({
  type: SET_USER_DETAILS,
  payload,
});

const showLoading = () => ({
  type: EDIT_USER_SHOW_LOADING,
});

export const editUserInit = (dispatch) => () => {
  dispatch({ type: EDIT_USER_PAGE_INIT });
};

export const changeFirstName = (dispatch) => (payload) => {
  dispatch({ type: EDIT_USER_CHANGE_FIRST_NAME, payload });
};

export const changeLastName = (dispatch) => (payload) => {
  dispatch({ type: EDIT_USER_CHANGE_LAST_NAME, payload });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({ type: EDIT_USER_CHANGE_EMAIL, payload });
};

export const changePhoneNumber = (dispatch) => (payload) => {
  dispatch({ type: EDIT_USER_CHANGE_PHONE_NUM, payload });
};

export const changeRole = (dispatch) => (payload) => {
  dispatch({ type: EDIT_USER_CHANGE_ROLE, payload });
};
