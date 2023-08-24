/*
 *
 * MyQuestions reducer
 *
 */
import produce from "immer";
import { UPDATE_QUESTION_LIST, QUESTION_PAGE_SET_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  questions: [],
};

/* eslint-disable default-case, no-param-reassign */
const myQuestionsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_QUESTION_LIST: {
        draft.questions = action.payload;
        draft.isLoading = false;
        break;
      }
      case QUESTION_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default myQuestionsReducer;
