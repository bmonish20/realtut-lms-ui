/*
 *
 * Quizzes reducer
 *
 */
import produce from "immer";
import { UPDATE_QUIZ_LIST, QUIZ_PAGE_SET_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  quizzes: [],
};

/* eslint-disable default-case, no-param-reassign */
const quizzesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_QUIZ_LIST: {
        draft.quizzes = action.payload;
        draft.isLoading = false;
        break;
      }
      case QUIZ_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default quizzesReducer;
