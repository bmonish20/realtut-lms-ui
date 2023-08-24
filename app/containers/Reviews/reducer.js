import produce from "immer";
import { UPDATE_REVIEW_LIST, REVIEW_PAGE_SET_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  reviews: [],
};

/* eslint-disable default-case, no-param-reassign */
const reviewsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_REVIEW_LIST: {
        draft.reviews = action.payload;
        draft.isLoading = false;
        break;
      }
      case REVIEW_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default reviewsReducer;
