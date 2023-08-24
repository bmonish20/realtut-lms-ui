/*
 *
 * FullCalendarView reducer
 *
 */
import produce from "immer";
import { FULLCALENDAR_EVENTS, FULLCALENDAR_SET_LOADING } from "./constants";
import { shapeChaptersToClasses } from "./helpers.js";

export const initialState = {
  upcomingEvents: [],
  upcomingClasses: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const fullCalendarViewReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FULLCALENDAR_EVENTS: {
        draft.upcomingEvents = action.payload.events;
        draft.upcomingClasses = shapeChaptersToClasses(action.payload.courses);
        draft.isLoading = false;
        break;
      }
      case FULLCALENDAR_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default fullCalendarViewReducer;
