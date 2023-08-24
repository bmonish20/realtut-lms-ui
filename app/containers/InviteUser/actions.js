import {
  INVITE_USER_INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  INVITE_USER_VALIDATION_ERROR,
  INVITE_USER_SHOW_LOADING,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";
import { sendInvite } from "./inviteUserApi";
import schema from "./validations";

export const onSubmit = (userDetails, next) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const isValid = await schema.isValid(userDetails);
      if (!isValid) {
        const err = await schema.validate(userDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      const { data } = await sendInvite(userDetails);
      next();
      NotificationHandler.open({
        operation: "success",
        title: "User Invite sent successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to invite user",
      });
    } finally {
      dispatch(showLoading(false));
    }
  };
};

const showLoading = (payload) => ({
  type: INVITE_USER_SHOW_LOADING,
  payload,
});

export const inviteUserInit = (dispatch) => () => {
  dispatch({ type: INVITE_USER_INIT });
};

const validationFailed = (payload) => ({
  type: INVITE_USER_VALIDATION_ERROR,
  payload,
});

export const changeName = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_NAME,
    payload,
  });
};

export const changeEmail = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_EMAIL,
    payload,
  });
};
