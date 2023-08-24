import {
  ADD_TASK_PAGE_INIT,
  ADD_TASK_CHANGE_TITLE,
  ADD_TASK_CHANGE_CATEGORY,
  ADD_TASK_CHANGE_SUB_CATEGORY,
  ADD_TASK_CHANGE_CLIENT,
  ADD_TASK_CHANGE_PRIORITY,
  ADD_TASK_CHANGE_START_DATE,
  ADD_TASK_CHANGE_DATE,
  ADD_TASK_CHANGE_TIME,
  ADD_TASK_CHANGE_STATUS,
  ADD_TASK_CHANGE_DESCRIPTION,
  ADD_TASK_CHANGE_ASSIGNED_TO,
  ADD_TASK_SHOW_LOADING,
  ADD_TASK_VALIDATION_ERROR,
  SET_TASK_DETAILS,
  UPDATE_USER_LIST,
  REMOVE_FILE_FROM_LIST,
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import schema from "./validations";
import {
  addTaskApi,
  editTaskApi,
  getUsers,
  uploadFile,
  downloadFile,
  deleteFile,
} from "./addTaskApi";
import { fetchTaskDetails } from "../Tasks/tasksApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
const { v4: uuidv4 } = require("uuid");

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await getUsers();
      dispatch(updateUserList(data));
    } catch (err) {
      dispatch(updateUserList());
    }
  };
};

export const onSubmit = ({ files, ...taskDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(taskDetails);
      if (!isValid) {
        const err = await schema.validate(taskDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      let fileKeys = [];
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData();
        formData.append("file", files[i]);
        const fileKey = uuidv4();
        const response = await uploadFile(formData, fileKey);
        fileKeys.push(fileKey);
      }
      var assignedToArray = [];
      taskDetails.assignedTo.map((user) => {
        assignedToArray.push(user.value);
      });
      await addTaskApi({
        ...taskDetails,
        assignedTo: assignedToArray,
        fileUrl: fileKeys,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Task added successfully",
      });
      history.push("/tasks");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add task",
      });
    }
  };
};

export const editTask = (id, { files, fileUrl, ...taskDetails }) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(taskDetails);
      if (!isValid) {
        const err = await schema.validate(taskDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));
      let fileKeys = [];
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData();
        formData.append("file", files[i]);
        const fileKey = uuidv4();
        const response = await uploadFile(formData, fileKey);
        fileKeys.push(fileKey);
      }
      var assignedToArray = [];
      taskDetails.assignedTo.map((user) => {
        assignedToArray.push(user.value);
      });
      await editTaskApi(id, {
        ...taskDetails,
        assignedTo: assignedToArray,
        fileUrl: [...fileUrl, ...fileKeys],
      });
      NotificationHandler.open({
        operation: "success",
        title: "Task updated successfully",
      });
      history.push("/tasks");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the task",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchTaskDetails(id);
      let signedFileUrls = [];
      for (let i = 0; i < data.fileUrl.length; i++) {
        const { data: url } = await downloadFile(data.fileUrl[i]);
        signedFileUrls.push({ key: data.fileUrl[i], url });
      }
      dispatch(setTaskDetails({ ...data, signedFileUrls }));
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

export const deleteAndRemoveFile = (key, fileUrl) => {
  return async (dispatch) => {
    try {
      // Deleting the file
      await deleteFile(key);

      // Removing keys from array
      let filteredKeyArray = fileUrl.filter((item) => item !== key);

      // Generating signedUrls for updated Keys
      let signedFileUrls = [];
      for (let i = 0; i < filteredKeyArray.length; i++) {
        const { data: url } = await downloadFile(filteredKeyArray[i]);
        signedFileUrls.push({ key: filteredKeyArray[i], url });
      }

      // Update to state
      dispatch(removeFile({ fileUrl: filteredKeyArray, signedFileUrls }));

      NotificationHandler.open({
        operation: "success",
        message: "Don't forget to save the task",
        title: "File Deleted Successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete file",
      });
    }
  };
};

const removeFile = (payload) => ({
  type: REMOVE_FILE_FROM_LIST,
  payload,
});

const validationFailed = (payload) => ({
  type: ADD_TASK_VALIDATION_ERROR,
  payload,
});

const setTaskDetails = (payload) => ({
  type: SET_TASK_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: ADD_TASK_SHOW_LOADING,
  payload,
});

const updateUserList = (payload = []) => ({
  type: UPDATE_USER_LIST,
  payload,
});

export const addTaskInit = (dispatch) => () => {
  dispatch({ type: ADD_TASK_PAGE_INIT });
};

export const changeTitle = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_TITLE,
    payload,
  });
};

export const changeCategory = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_CATEGORY,
    payload,
  });
};

export const changeSubCategory = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_SUB_CATEGORY,
    payload,
  });
};

export const changeClient = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_CLIENT,
    payload,
  });
};

export const changePriority = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_PRIORITY,
    payload,
  });
};

export const changeStartDate = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_START_DATE,
    payload,
  });
};

export const changeDate = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_DATE,
    payload,
  });
};

export const changeTime = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_TIME,
    payload,
  });
};

export const changeStatus = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_STATUS,
    payload,
  });
};

export const changeAssignedTo = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_ASSIGNED_TO,
    payload,
  });
};

export const changeDescription = (dispatch) => (payload) => {
  dispatch({
    type: ADD_TASK_CHANGE_DESCRIPTION,
    payload,
  });
};
