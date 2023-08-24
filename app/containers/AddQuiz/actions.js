/*
 *
 * AddQuiz actions
 *
 */

import {
  ADD_QUIZ_PAGE_INIT,
  ADD_QUIZ_CHANGE_TITLE,
  ADD_QUIZ_CHANGE_FOR_COURSE,
  ADD_QUIZ_CHANGE_DURATION,
  ADD_QUIZ_CHANGE_QUESTIONS,
  SET_AVAILABLE_QUESTIONS,
  APPEND_QUESTION,
  REMOVE_QUESTION,
  ADD_QUIZ_VALIDATION_ERROR,
  ADD_QUIZ_SHOW_LOADING,
  SET_QUIZ_DETAILS,
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import schema from "./validations";
import { addQuiz, fetchQuizDetails, editQuizApi } from "../Quizzes/quizzesApi";
import { getQuestions } from "../AddQuestion/addQuestionApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const { data } = await getQuestions();
      dispatch(setQuestionsDropDown(data));
    } catch (err) {
      dispatch(setQuestionsDropDown());
    }
  };
};

export const onSubmit = (quizDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(quizDetails);
      if (!isValid) {
        const err = await schema.validate(quizDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var questions = [];
      dispatch(showLoading(true));
      quizDetails.questions.map(({ id }) => questions.push(id));
      await addQuiz({ ...quizDetails, questions });
      NotificationHandler.open({
        operation: "success",
        title: "Quiz added successfully",
      });
      history.push("/quizzes");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add quiz",
      });
    }
  };
};

export const editQuiz = (id, quizDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(quizDetails);
      if (!isValid) {
        const err = await schema.validate(quizDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var questions = [];
      dispatch(showLoading(true));
      quizDetails.questions.map(({ id }) => questions.push(id));
      await editQuizApi(id, { ...quizDetails, questions });
      NotificationHandler.open({
        operation: "success",
        title: "Quiz updated successfully",
      });
      history.push("/quizzes");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit quiz",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchQuizDetails(id);
      dispatch(setQuizDetails(data));
    } catch (err) {
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

const validationFailed = (payload) => ({
  type: ADD_QUIZ_VALIDATION_ERROR,
  payload,
});

const setQuizDetails = (payload) => ({
  type: SET_QUIZ_DETAILS,
  payload,
});

const setQuestionsDropDown = (payload) => ({
  type: SET_AVAILABLE_QUESTIONS,
  payload,
});

export const appendQuestion = (payload) => ({
  type: APPEND_QUESTION,
  payload,
});

export const removeQuestion = (payload) => ({
  type: REMOVE_QUESTION,
  payload,
});

const showLoading = (payload) => ({
  type: ADD_QUIZ_SHOW_LOADING,
  payload,
});

export const addQuizInit = (dispatch) => () => {
  dispatch({ type: ADD_QUIZ_PAGE_INIT });
};

export const changeTitle = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUIZ_CHANGE_TITLE,
    payload,
  });
};

export const changeForCourse = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUIZ_CHANGE_FOR_COURSE,
    payload,
  });
};

export const changeDuration = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUIZ_CHANGE_DURATION,
    payload,
  });
};

export const changeQuestions = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUIZ_CHANGE_QUESTIONS,
    payload,
  });
};
