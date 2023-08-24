/*
 *
 * QuizForm reducer
 *
 */
import produce from "immer";
import {
  QUIZ_FORM_INIT,
  SET_QUIZ_DETAILS,
  QUIZ_FORM_SHOW_LOADING,
  QUIZ_FORM_CHANGE_ANSWER,
} from "./constants";

export const initialState = {
  isLoading: true,
  response: [],
  quiz: {},
  questions: [],
};

/* eslint-disable default-case, no-param-reassign */
const quizFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUIZ_FORM_INIT:
        return initialState;
      case SET_QUIZ_DETAILS:
        draft.quiz = action.payload;
        draft.questions = action.payload.questions;
        draft.isLoading = false;
      case QUIZ_FORM_SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
      case QUIZ_FORM_CHANGE_ANSWER:
        var ans = { answer: action.payload };
        draft.response[action.index] = ans;
        break;
    }
  });

export default quizFormReducer;
