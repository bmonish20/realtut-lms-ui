/*
 *
 * TaskLogs actions
 *
 */

import { SET_TASK_DETAILS, VIEW_HISTORY_INIT } from "./constants";
import { fetchTaskDetails } from "../Tasks/tasksApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchTaskDetails(id);
      dispatch(setTaskDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch task details",
      });
    }
  };
};

const setTaskDetails = (payload) => ({
  type: SET_TASK_DETAILS,
  payload,
});

export const viewHistoryInit = (dispatch) => () => {
  dispatch({ type: VIEW_HISTORY_INIT });
};
