/*
 *
 * Tasks actions
 *
 */

import _get from "lodash/get";
import {
  UPDATE_TASK_LIST,
  TASK_PAGE_SET_LOADING,
  TASK_PAGE_CHANGE_FILTER,
} from "./constants";
import { getTasks, deleteTask, fetchSpecificStatus } from "./tasksApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchFilteredTasks = (status, page) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchSpecificStatus(status, page);
      dispatch(updateTaskList(data));
    } catch (err) {
      dispatch(updateTaskList());
    }
  };
};

export const fetchTasks = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await getTasks(page);
      dispatch(updateTaskList(data));
    } catch (err) {
      dispatch(updateTaskList());
    }
  };
};

export const deleteOneTask = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteTask(id);
      dispatch(fetchTasks());
      NotificationHandler.open({
        operation: "success",
        title: "Task deleted successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Task",
      });
      dispatch(setLoading(false));
    }
  };
};

const setLoading = (payload) => ({
  type: TASK_PAGE_SET_LOADING,
  payload,
});

const updateTaskList = (payload = []) => ({
  type: UPDATE_TASK_LIST,
  payload,
});

export const changeFilter = (dispatch) => (payload) => {
  dispatch({ type: TASK_PAGE_CHANGE_FILTER, payload });
};
