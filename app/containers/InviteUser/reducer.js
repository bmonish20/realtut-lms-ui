/*
 *
 * InviteUser reducer
 *
 */
import produce from "immer";
import {
  INVITE_USER_INIT,
  CHANGE_NAME,
  CHANGE_EMAIL,
  INVITE_USER_VALIDATION_ERROR,
  INVITE_USER_SHOW_LOADING,
} from "./constants";

export const initialState = {
  name: "",
  email: "",
  isLoading: false,
  validations: null,
};

/* eslint-disable default-case, no-param-reassign */
const inviteUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INVITE_USER_INIT:
        return initialState;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_EMAIL:
        draft.email = action.payload;
        break;
      case INVITE_USER_SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
      case INVITE_USER_VALIDATION_ERROR:
        draft.validations = action.payload;
        break;
    }
  });

export default inviteUserReducer;
