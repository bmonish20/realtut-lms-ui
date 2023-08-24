import produce from "immer";
import _get from "lodash/get";
import moment from "moment-timezone";
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

import { shapeAvailableUsers } from "./helpers";

const initialState = {
  taskName: "",
  category: "",
  subCategory: "",
  client: "",
  priority: "",
  startDate: "",
  dueDate: "",
  time: "",
  status: "",
  description: "",
  assignedTo: "",
  fileUrl: [],
  signedFileUrls: [],
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
  availableUsers: [],
  logs: [],
};

const getAssignedTo = (users = []) => {
  let assignedToArray = [];
  users.map((user) =>
    assignedToArray.push({
      value: user._id,
      label: user.name,
    })
  );
  return assignedToArray;
};

const getTag = (tag = "") => ({ value: tag, label: tag });

const getErrorMessage = (err) =>
  _get(err, "response.data", null) || "Event not added. Please try again later";

const addTaskReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TASK_DETAILS: {
        draft.taskName = action.payload.taskName;
        draft.category = getTag(action.payload.category);
        draft.subCategory = getTag(action.payload.subCategory);
        draft.client = getTag(action.payload.client);
        draft.priority = action.payload.priority;
        draft.startDate = action.payload.startDate
          ? moment(action.payload.startDate)
          : "";
        draft.dueDate = action.payload.dueDate
          ? moment(action.payload.dueDate)
          : "";
        draft.time = moment(action.payload.time);
        draft.status = action.payload.status;
        draft.description = action.payload.description;
        draft.assignedTo = getAssignedTo(action.payload.assignedTo);
        draft.logs = action.payload.logs;
        draft.fileUrl = action.payload.fileUrl;
        draft.signedFileUrls = action.payload.signedFileUrls;
        draft.isEdit = true;
        break;
      }
      case REMOVE_FILE_FROM_LIST:
        draft.fileUrl = action.payload.fileUrl;
        draft.signedFileUrls = action.payload.signedFileUrls;
        break;
      case UPDATE_USER_LIST:
        draft.availableUsers = shapeAvailableUsers(action.payload);
        break;
      case ADD_TASK_PAGE_INIT:
        return initialState;
      case ADD_TASK_CHANGE_TITLE:
        draft.taskName = action.payload;
        break;
      case ADD_TASK_CHANGE_CATEGORY:
        draft.category = action.payload;
        break;
      case ADD_TASK_CHANGE_SUB_CATEGORY:
        draft.subCategory = action.payload;
        break;
      case ADD_TASK_CHANGE_CLIENT:
        draft.client = action.payload;
        break;
      case ADD_TASK_CHANGE_PRIORITY:
        draft.priority = action.payload;
        break;
      case ADD_TASK_CHANGE_DATE:
        draft.dueDate = action.payload;
        break;
      case ADD_TASK_CHANGE_START_DATE:
        draft.startDate = action.payload;
        break;
      case ADD_TASK_CHANGE_TIME:
        draft.time = action.payload;
        break;
      case ADD_TASK_CHANGE_STATUS:
        draft.status = action.payload;
        break;
      case ADD_TASK_CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case ADD_TASK_CHANGE_ASSIGNED_TO:
        draft.assignedTo = action.payload;
        break;
      case ADD_TASK_SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case ADD_TASK_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
    }
  });

export default addTaskReducer;
