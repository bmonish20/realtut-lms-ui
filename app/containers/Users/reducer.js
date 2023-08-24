/*
 *
 * Users reducer
 *
 */
import produce from "immer";
import {
  UPDATE_USER_LIST,
  USERS_PAGE_SET_LOADING,
  USERS_PAGE_CHANGE_FILTER,
  USERS_PAGE_CHANGE_SEARCH,
} from "./constants";

export const initialState = {
  isLoading: true,
  users: [],
  role: "",
  searchString: "",
};

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USER_LIST:
        draft.users = action.payload;
        draft.isLoading = false;
        break;
      case USERS_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case USERS_PAGE_CHANGE_FILTER:
        draft.role = action.payload;
        break;
      case USERS_PAGE_CHANGE_SEARCH:
        draft.searchString = action.payload;
        break;
    }
  });

export default usersReducer;
