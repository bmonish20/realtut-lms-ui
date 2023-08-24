import produce from "immer";
import _get from "lodash/get";
import {
  EDIT_USER_PAGE_INIT,
  EDIT_USER_CHANGE_FIRST_NAME,
  EDIT_USER_CHANGE_LAST_NAME,
  EDIT_USER_CHANGE_EMAIL,
  EDIT_USER_CHANGE_PHONE_NUM,
  EDIT_USER_CHANGE_ROLE,
  EDIT_USER_SHOW_LOADING,
  EDIT_USER_VALIDATION_ERROR,
  SET_USER_DETAILS,
} from "./constants";

export const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  role: "",
  enabled: true,
  isLoading: false,
  validationError: null,
};

const editUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER_DETAILS: {
        draft.firstName = action.payload.firstName;
        draft.lastName = action.payload.lastName;
        draft.email = action.payload.email;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.role = action.payload.role;
        draft.enabled = action.payload.enabled;
        break;
      }
      case EDIT_USER_PAGE_INIT:
        return initialState;
      case EDIT_USER_CHANGE_FIRST_NAME:
        draft.firstName = action.payload;
        break;
      case EDIT_USER_CHANGE_LAST_NAME:
        draft.lastName = action.payload;
        break;
      case EDIT_USER_CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case EDIT_USER_CHANGE_PHONE_NUM:
        draft.phoneNumber = action.payload;
        break;
      case EDIT_USER_CHANGE_ROLE:
        draft.role = action.payload;
        break;
      case EDIT_USER_SHOW_LOADING:
        draft.isLoading = true;
        draft.validationError = null;
        break;
      case EDIT_USER_VALIDATION_ERROR:
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
    }
  });

export default editUserReducer;
