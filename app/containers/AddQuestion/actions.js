import {
  ADD_QUESTION_PAGE_INIT,
  ADD_QUESTION_CHANGE_QUESTION,
  ADD_QUESTION_CHANGE_TYPE,
  ADD_QUESTION_CHANGE_MCQ_OPTIONS,
  ADD_QUESTION_CHANGE_POINTS,
  ADD_QUESTION_SHOW_LOADING,
  ADD_QUESTION_VALIDATION_ERROR,
  SET_QUESTION_DETAILS,
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import {
  addQuestion,
  editQuestionApi,
  fetchQuestionDetails,
} from "./addQuestionApi";
import schema from "./validations";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (questionDetails, postAdd, next) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(questionDetails);
      if (!isValid) {
        const err = await schema.validate(questionDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var mcqOptionsArray = [];
      dispatch(showLoading(true));
      questionDetails.mcqOptions.map((mcqOption) => {
        mcqOptionsArray.push(mcqOption.value);
      });
      const {
        data: { id, question },
      } = await addQuestion({
        ...questionDetails,
        mcqOptions: mcqOptionsArray,
      });
      postAdd({ id, question });
      next();
      NotificationHandler.open({
        operation: "success",
        title: "Question added successfully",
      });
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add question",
      });
    }
  };
};

export const editQuestion = (id, questionDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(questionDetails);
      if (!isValid) {
        const err = await schema.validate(questionDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var mcqOptionsArray = [];
      dispatch(showLoading(true));
      questionDetails.mcqOptions.map((mcqOption) => {
        mcqOptionsArray.push(mcqOption.value);
      });
      await editQuestionApi(id, {
        ...questionDetails,
        mcqOptions: mcqOptionsArray,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Question updated successfully",
      });
      history.push("/add-quiz");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the question",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchQuestionDetails(id);
      dispatch(setQuestionDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch question details",
      });
    }
  };
};

export const addQuestionInit = (dispatch) => () => {
  dispatch({ type: ADD_QUESTION_PAGE_INIT });
};

export const setQuestionDetails = (payload) => ({
  type: SET_QUESTION_DETAILS,
  payload,
});

export const changeQuestion = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUESTION_CHANGE_QUESTION,
    payload,
  });
};

export const changeType = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUESTION_CHANGE_TYPE,
    payload,
  });
};

export const changeMcqOptions = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUESTION_CHANGE_MCQ_OPTIONS,
    payload,
  });
};

export const changePoints = (dispatch) => (payload) => {
  dispatch({
    type: ADD_QUESTION_CHANGE_POINTS,
    payload,
  });
};

export const validationFailed = (payload) => ({
  type: ADD_QUESTION_VALIDATION_ERROR,
  payload,
});

export const showLoading = (payload) => ({
  type: ADD_QUESTION_SHOW_LOADING,
  payload,
});
