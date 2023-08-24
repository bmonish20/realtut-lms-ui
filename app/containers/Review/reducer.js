import produce from "immer";
import {
  REVIEW_PAGE_INIT,
  REVIEW_PAGE_SET_LOADING,
  REVIEW_PAGE_SET_DETAILS,
  REVIEW_PAGE_CHANGE_MARK,
  REVIEW_PAGE_CHANGE_COMMENT,
  REVIEW_PAGE_VALIDATION_ERROR,
} from "./constants";

export const initialState = {
  quizId: [],
  attendedBy: "",
  response: [],
  isLoading: true,
  validations: null,
};

/* eslint-disable default-case, no-param-reassign */
const reviewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REVIEW_PAGE_SET_DETAILS: {
        draft.quizId = action.payload.quizId;
        draft.attendedBy = action.payload.attendedBy;
        draft.response = action.payload.response;
        draft.isLoading = false;
        break;
      }
      case REVIEW_PAGE_INIT:
        return initialState;
      case REVIEW_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case REVIEW_PAGE_CHANGE_MARK:
        draft.response[action.index].mark = action.payload;
        break;
      case REVIEW_PAGE_CHANGE_COMMENT:
        draft.response[action.index].comment = action.payload;
        break;
      case REVIEW_PAGE_VALIDATION_ERROR: {
        draft.validations = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
    }
  });

export default reviewReducer;
