/*
 *
 * AddQuiz reducer
 *
 */
import produce from "immer";
import _get from "lodash/get";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _pullAt from "lodash/pullAt";
import _findIndex from "lodash/findIndex";
import { shapeToDropDown } from "./helpers";

import {
  ADD_QUIZ_PAGE_INIT,
  ADD_QUIZ_CHANGE_TITLE,
  ADD_QUIZ_CHANGE_FOR_COURSE,
  ADD_QUIZ_CHANGE_DURATION,
  ADD_QUIZ_CHANGE_QUESTIONS,
  SET_AVAILABLE_QUESTIONS,
  APPEND_QUESTION,
  REMOVE_QUESTION,
  ADD_QUIZ_VALIDATION_ERROR,
  ADD_QUIZ_SHOW_LOADING,
  SET_QUIZ_DETAILS,
} from "./constants";
export const initialState = {
  title: "",
  forCourse: "",
  duration: "",
  questions: [],
  availableQuestions: [],
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const addQuizReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUIZ_DETAILS: {
        draft.title = action.payload.title;
        draft.forCourse = action.payload.forCourse;
        draft.duration = action.payload.duration;
        draft.questions = action.payload.questions;
        draft.availableQuestions = _filter(
          draft.availableQuestions,
          (each) =>
            !_find(
              action.payload.questions,
              (question) => question.id === each.value
            )
        );
        draft.isEdit = true;
        break;
      }
      case ADD_QUIZ_PAGE_INIT:
        return initialState;
      case ADD_QUIZ_CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case ADD_QUIZ_CHANGE_FOR_COURSE:
        draft.forCourse = action.payload;
        break;
      case ADD_QUIZ_CHANGE_DURATION:
        draft.duration = action.payload;
        break;
      case ADD_QUIZ_CHANGE_QUESTIONS:
        draft.questions = action.payload;
        break;
      case SET_AVAILABLE_QUESTIONS:
        draft.availableQuestions = shapeToDropDown(action.payload);
        break;
      case APPEND_QUESTION:
        draft.questions.push(action.payload);
        _pullAt(
          draft.availableQuestions,
          _findIndex(
            draft.availableQuestions,
            (each) => each.value === action.payload.id
          )
        );
        break;
      case REMOVE_QUESTION: {
        const { index, id: value, question: label } = action.payload;
        draft.questions.splice(index, 1);
        draft.availableQuestions.push({
          value,
          label,
        });
        break;
      }
      case ADD_QUIZ_SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case ADD_QUIZ_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
    }
  });

export default addQuizReducer;
