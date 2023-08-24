import {
  SET_FORUM_MESSAGES,
  SET_FORUM_PAGE,
  CHANGE_FORUM_INPUT,
  REFRESH_FORUM_MESSAGES,
  FORUM_INIT,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";
import { sendForumMessage, fetchForumMessages } from "./forumApi";

export const fetchMessages = (courseId, page) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchForumMessages(courseId, page);
      dispatch(setForumPage(page));
      dispatch(setForumMessages(data));
    } catch (err) {
      dispatch(setForumMessages());
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch the Messages",
      });
    }
  };
};

export const sendMessage = (messageDetails, courseId) => {
  return async (dispatch) => {
    try {
      await sendForumMessage(messageDetails);
      const { data } = await fetchForumMessages(courseId, 1);
      dispatch(refreshForumMessages(data));
    } catch (err) {
      console.log(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to Send Blah Blah",
      });
    }
  };
};

const refreshForumMessages = (payload) => ({
  type: REFRESH_FORUM_MESSAGES,
  payload,
});

const setForumMessages = (payload) => ({
  type: SET_FORUM_MESSAGES,
  payload,
});

export const forumInit = (dispatch) => () => {
  dispatch({ type: FORUM_INIT });
};
export const setForumPage = (payload) => ({
  type: SET_FORUM_PAGE,
  payload,
});

export const changeInputText = (dispatch) => (payload) => {
  dispatch({
    type: CHANGE_FORUM_INPUT,
    payload,
  });
};
