/*
 *
 * AddQuestion reducer
 *
 */
import produce from "immer";
import {
  ADD_QUESTION_PAGE_INIT,
  ADD_QUESTION_CHANGE_QUESTION,
  ADD_QUESTION_CHANGE_TYPE,
  ADD_QUESTION_CHANGE_MCQ_OPTIONS,
  ADD_QUESTION_CHANGE_POINTS,
  ADD_QUESTION_SHOW_LOADING,
  ADD_QUESTION_VALIDATION_ERROR,
  SET_QUESTION_DETAILS,
} from "./constants";

export const initialState = {
  question: "",
  type: null,
  mcqOptions: [],
  points: "",
  isLoading: false,
  validationError: null,
  isEdit: false,
};

const getMcqOptions = (options = []) => {
  let formattedOptions = [];
  options.map((option) =>
    formattedOptions.push({
      value: option,
      label: option,
    })
  );
  return formattedOptions;
};

/* eslint-disable default-case, no-param-reassign */
const addQuestionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_QUESTION_DETAILS: {
        draft.question = action.payload.question;
        draft.type = action.payload.type;
        draft.mcqOptions = getMcqOptions(action.payload.mcqOptions);
        draft.points = action.payload.points;
        draft.isEdit = true;
        break;
      }
      case ADD_QUESTION_PAGE_INIT:
        return initialState;
      case ADD_QUESTION_CHANGE_QUESTION:
        draft.question = action.payload;
        break;
      case ADD_QUESTION_CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case ADD_QUESTION_CHANGE_MCQ_OPTIONS:
        draft.mcqOptions = action.payload;
        break;
      case ADD_QUESTION_CHANGE_POINTS:
        draft.points = action.payload;
        break;
      case ADD_QUESTION_SHOW_LOADING: {
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      }
      case ADD_QUESTION_VALIDATION_ERROR: {
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
    }
  });

export default addQuestionReducer;
