/*
 *
 * AddPoll reducer
 *
 */
import produce from "immer";
import {
  ADD_POLL_INIT,
  ADD_POLL_CHANGE_TITLE,
  ADD_POLL_CHANGE_OPTIONS,
  ADD_POLL_SHOW_LOADING,
  SET_POLL_DETAILS,
} from "./constants";

export const initialState = {
  title: "",
  options: [],
  isLoading: false,
  pollId: "",
  pollQuestion: "",
  pollAnswers: [],
};

/* eslint-disable default-case, no-param-reassign */
const addPollReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POLL_CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case ADD_POLL_CHANGE_OPTIONS:
        draft.options = action.payload;
        break;
      case ADD_POLL_INIT:
        return initialState;
      case ADD_POLL_SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_POLL_DETAILS:
        draft.pollId = action.payload.id;
        draft.pollQuestion = action.payload.title;
        draft.pollAnswers = action.payload.options;
        draft.isLoading = false;
    }
  });

export default addPollReducer;
