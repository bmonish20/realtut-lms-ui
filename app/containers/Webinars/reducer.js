/*
 *
 * Webinars reducer
 *
 */
import produce from "immer";
import { UPDATE_WEBINAR_LIST, EVENT_PAGE_SET_LOADING,SET_WEBINAR_TYPE, NEW_EVENTS } from "./constants";

export const initialState = {
  isLoading: true,
  webinars: [],
  webinarType: NEW_EVENTS,
};

/* eslint-disable default-case, no-param-reassign */
const webinarsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_WEBINAR_LIST: {
        draft.webinars = action.payload;
        draft.isLoading = false;
        break;
      }
      case SET_WEBINAR_TYPE: {
        draft.webinarType = action.payload;
        break;
      }
      case EVENT_PAGE_SET_LOADING: 
        draft.isLoading = action.payload; break;
    }
  });

export default webinarsReducer;
