import {
  QUIZ_FORM_INIT,
  QUIZ_FORM_SHOW_LOADING,
  QUIZ_FORM_CHANGE_ANSWER,
  SET_QUIZ_DETAILS,
} from "./constants";
import _get from "lodash/get";
import { addResponse, fetchQuizDetails } from "./quizFormApi";
import history from "../../utils/history";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (quizId, quizAnswerDetails) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      quizAnswerDetails.questions.map((question, index) => {
        quizAnswerDetails.response[index].questionId = question.id;
        quizAnswerDetails.response[
          index
        ].questionName = question.question.replace(/(<([^>]+)>)/gi, "");
      });
      await addResponse({ quizId, ...quizAnswerDetails });
      NotificationHandler.open({
        operation: "success",
        title: "Quiz submitted successfully",
      });
      history.goBack();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to submit quiz",
      });
    }
  };
};

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
        title: "Unable to submit quiz",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: QUIZ_FORM_SHOW_LOADING,
  payload,
});

const setQuizDetails = (payload) => ({
  type: SET_QUIZ_DETAILS,
  payload,
});

export const quizFormInit = (dispatch) => () => {
  dispatch({ type: QUIZ_FORM_INIT });
};

export const changeAnswer = (payload, index) => ({
  type: QUIZ_FORM_CHANGE_ANSWER,
  payload,
  index,
});
