import produce from "immer";
import {
  SCORE_PAGE_SET_LOADING,
  SCORE_PAGE_INIT,
  SCORE_PAGE_SET_DETAILS,
} from "./constants";

export const initialState = {
  quizId: "",
  attendedBy: "",
  response: [],
  totalScore: 0,
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const quizScoreReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SCORE_PAGE_SET_DETAILS:
        draft.quizId = action.payload.quizId;
        draft.attendedBy = action.payload.attendedBy;
        draft.response = action.payload.response;
        draft.totalScore = action.payload.totalScore;
        draft.isLoading = false;
        break;
      case SCORE_PAGE_INIT:
        return initialState;
      case SCORE_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default quizScoreReducer;
