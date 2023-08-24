/*
 *
 * QuizDetails reducer
 *
 */
import produce from "immer";
import {
  SET_QUIZ_DETAILS,
  QUIZ_DETAILS_INIT,
  QUIZ_DETAILS_SHOW_LOADING,
} from "./constants";

export const initialState = {
  isLoading: true,
  quiz: {},
  questions: [],
};

/* eslint-disable default-case, no-param-reassign */
const quizDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUIZ_DETAILS_INIT:
        return initialState;
      case SET_QUIZ_DETAILS:
        draft.quiz = action.payload;
        draft.questions = action.payload.questions;
        draft.isLoading = false;
        break;
      case QUIZ_DETAILS_SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default quizDetailsReducer;
