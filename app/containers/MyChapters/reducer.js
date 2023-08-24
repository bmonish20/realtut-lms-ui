/*
 *
 * MyChapters reducer
 *
 */
import produce from "immer";
import { INIT_PAGE, SET_CHAPTERS, SET_LOADING } from "./constants";

export const initialState = {
  chapters: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const myChaptersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_PAGE: 
        return initialState;
      case SET_CHAPTERS: draft.chapters = action.payload;
        break;
      case SET_LOADING: draft.isLoading = action.payload;
        break;
    }
  });

export default myChaptersReducer;
