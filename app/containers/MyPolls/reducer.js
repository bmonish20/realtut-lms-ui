import produce from "immer";
import { SET_POLLS, MY_POLLS_SET_LOADING } from "./constants";

export const initialState = {
  polls: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const myPollsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POLLS:
        draft.polls = action.payload;
        draft.isLoading = false;
        break;
      case MY_POLLS_SET_LOADING:
        draft.isLoading = action.payload;
    }
  });

export default myPollsReducer;
