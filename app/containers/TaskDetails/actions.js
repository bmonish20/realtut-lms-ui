/*
 *
 * TaskDetails actions
 *
 */

import { SET_TASK_DETAILS, TASK_DETAILS_INIT } from "./constants";
import { fetchTaskDetails } from "../Tasks/tasksApi";
import { downloadFile } from "./taskDetailsApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchTaskDetails(id);
      let signedFileUrls = [];
      for (let i = 0; i < data.fileUrl.length; i++) {
        const { data: url } = await downloadFile(data.fileUrl[i]);
        signedFileUrls.push(url);
      }
      dispatch(setTaskDetails({ ...data, fileUrl: signedFileUrls }));
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

export const taskDetailsInit = (dispatch) => () => {
  dispatch({ type: TASK_DETAILS_INIT });
};
