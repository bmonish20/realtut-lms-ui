/*
 *
 * Forum reducer
 *
 */
import produce from "immer";
import {
  SET_FORUM_MESSAGES,
  SET_FORUM_PAGE,
  CHANGE_FORUM_INPUT,
  REFRESH_FORUM_MESSAGES,
  FORUM_INIT,
} from "./constants";

export const initialState = {
  isLoading: true,
  forumMessages: [],
  page: 1,
  hasMore: true,
  inputText: "",
};

/* eslint-disable default-case, no-param-reassign */
const forumReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_FORUM_INPUT:
        draft.inputText = action.payload;
        break;
      case FORUM_INIT:
        return initialState;
      case SET_FORUM_PAGE:
        draft.page = action.payload;
        break;
      case SET_FORUM_MESSAGES:
        draft.forumMessages = draft.forumMessages.concat(action.payload);
        draft.isLoading = false;
        break;
      case REFRESH_FORUM_MESSAGES:
        draft.forumMessages = action.payload;
        draft.page = 1;
        break;
    }
  });

export default forumReducer;
