import {
  SET_QUIZ_DETAILS,
  QUIZ_DETAILS_INIT,
  QUIZ_DETAILS_SHOW_LOADING,
} from "./constants";
import _get from "lodash/get";
import { fetchQuizDetails } from "./quizDetailsApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchQuiz = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchQuizDetails(id);
      dispatch(showLoading(true));
      dispatch(setQuizDetails(data));
      dispatch(showLoading(false));
    } catch (err) {
      dispatch(showLoading(false));
      dispatch(setQuizDetails());
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch quiz details",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: QUIZ_DETAILS_SHOW_LOADING,
  payload,
});

const setQuizDetails = (payload) => ({
  type: SET_QUIZ_DETAILS,
  payload,
});

export const quizDetailsInit = (dispatch) => () => {
  dispatch({ type: QUIZ_DETAILS_INIT });
};
