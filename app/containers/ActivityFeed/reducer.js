import produce from "immer";
import { ACTIVITY_FEED_SHOW_LOADING, UPDATE_ACTIVITY_LIST } from "./constants";

export const initialState = {
  isLoading: true,
  activities: [],
};

/* eslint-disable default-case, no-param-reassign */
const activityFeedReducer = (state = initialState, action) =>
  produce(state, ( draft ) => {
    switch (action.type) {
      case UPDATE_ACTIVITY_LIST:
        draft.activities = action.payload,
        draft.isLoading =false;
        break;
      case ACTIVITY_FEED_SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default activityFeedReducer;
