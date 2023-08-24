import produce from "immer";
import _get from "lodash/get";
import moment from "moment-timezone";
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

export const initialState = {
  todoName: "",
  priority: "",
  dueDate: "",
  time: "",
  status: "",
  description: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) || "Event not added. Please try again later";

/* eslint-disable default-case, no-param-reassign */
const addTodoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TODO_DETAILS: {
        draft.todoName = action.payload.todoName;
        draft.priority = action.payload.priority;
        draft.dueDate = moment(action.payload.dueDate);
        draft.time = moment(action.payload.time);
        draft.status = action.payload.status;
        draft.description = action.payload.description;
        draft.isEdit = true;
        break;
      }
      case ADD_TODO_PAGE_INIT:
        return initialState;
      case ADD_TODO_CHANGE_TITLE:
        draft.todoName = action.payload;
        break;
      case ADD_TODO_CHANGE_PRIORITY:
        draft.priority = action.payload;
        break;
      case ADD_TODO_CHANGE_DATE:
        draft.dueDate = action.payload;
        break;
      case ADD_TODO_CHANGE_TIME:
        draft.time = action.payload;
        break;
      case ADD_TODO_CHANGE_STATUS:
        draft.status = action.payload;
        break;
      case ADD_TODO_CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case ADD_TODO_SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case ADD_TODO_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
    }
  });

export default addTodoReducer;
