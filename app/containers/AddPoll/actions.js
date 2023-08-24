import {
  ADD_POLL_INIT,
  ADD_POLL_CHANGE_TITLE,
  ADD_POLL_CHANGE_OPTIONS,
  ADD_POLL_SHOW_LOADING,
  SET_POLL_DETAILS,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";
import { addPoll, updatePoll } from "./addPollApi";

export const onSubmit = (pollDetails, next) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      var optionsArray = [];
      pollDetails.options.map(({ value }) => {
        optionsArray.push({ option: value, votes: 0 });
      });
      const { data } = await addPoll({ ...pollDetails, options: optionsArray });
      next();
      NotificationHandler.open({
        operation: "success",
        title: "Poll sent successfully",
      });
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add poll",
      });
    }
  };
};

export const submitPoll = (pollId, pollAnswers, voteAnswer) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const options = pollAnswers.map((answer) => {
        if (answer.option === voteAnswer) answer.votes++;
        return answer;
      });
      const { data } = await updatePoll(pollId, { options });
      NotificationHandler.open({
        operation: "success",
        title: "Poll submitted successfully",
      });
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch poll details",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: ADD_POLL_SHOW_LOADING,
  payload,
});

const setPollDetails = (payload) => ({
  type: SET_POLL_DETAILS,
  payload,
});

export const addPollInit = (dispatch) => () => {
  dispatch({ type: ADD_POLL_INIT });
};

export const changeTitle = (dispatch) => (payload) => {
  dispatch({
    type: ADD_POLL_CHANGE_TITLE,
    payload,
  });
};

export const changeOptions = (dispatch) => (payload) => {
  dispatch({
    type: ADD_POLL_CHANGE_OPTIONS,
    payload,
  });
};
