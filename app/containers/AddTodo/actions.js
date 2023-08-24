/*
 *
 * AddTodo actions
 *
 */

import {
  ADD_TODO_PAGE_INIT,
  ADD_TODO_CHANGE_TITLE,
  ADD_TODO_CHANGE_PRIORITY,
  ADD_TODO_CHANGE_DATE,
  ADD_TODO_CHANGE_TIME,
  ADD_TODO_CHANGE_STATUS,
  ADD_TODO_CHANGE_DESCRIPTION,
  ADD_TODO_SHOW_LOADING,
  ADD_TODO_VALIDATION_ERROR,
  SET_TODO_DETAILS,
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import schema from "./validations";
import { addTodoApi, editTodoApi, fetchTodoDetails } from "./addTodoApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (todoDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(todoDetails);
      if (!isValid) {
        const err = await schema.validate(todoDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await addTodoApi(todoDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Todo added successfully",
      });
      history.push("/todos");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add todo",
      });
    }
  };
};

export const editTodo = (id, todoDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(todoDetails);
      if (!isValid) {
        const err = await schema.validate(todoDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      await editTodoApi(id, todoDetails);
      NotificationHandler.open({
        operation: "success",
        title: "Todo updated successfully",
      });
      history.push("/todos");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the todo",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchTodoDetails(id);
      dispatch(setTodoDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch todo details",
      });
    }
  };
};
const validationFailed = (payload) => ({
  type: ADD_TODO_VALIDATION_ERROR,
  payload,
});

const setTodoDetails = (payload) => ({
  type: SET_TODO_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: ADD_TODO_SHOW_LOADING,
  payload,
});

export const addTodoInit = (dispatch) => () => {
  dispatch({ type: ADD_TODO_PAGE_INIT });
};

export const changeTitle = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_TITLE,
    payload,
  });
};

export const changePriority = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_PRIORITY,
    payload,
  });
};

export const changeDate = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_DATE,
    payload,
  });
};

export const changeTime = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_TIME,
    payload,
  });
};

export const changeStatus = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_STATUS,
    payload,
  });
};

export const changeDescription = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TODO_CHANGE_DESCRIPTION,
    payload,
  });
};
