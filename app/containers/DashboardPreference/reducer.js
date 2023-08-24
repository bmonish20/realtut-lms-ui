/*
 *
 * DashboardPreference reducer
 *
 */
import produce from "immer";
import {
  CHANGE_TASK_PREFERENCE,
  CHANGE_CALENDAR_PREFERENCE,
  CHANGE_EVENT_PREFERENCE,
  CHANGE_POPULAR_COURSE_PREFERENCE,
  CHANGE_COURSE_PROGRESS_PREFERENCE,
  CHANGE_ACTIVITY_FEED_PREFERENCE,
  SET_LOADING,
  SET_PREFERENCES,
} from "./constants";

export const initialState = {
  taskPreference: true,
  calendarPreference: true,
  eventPreference: true,
  courseProgressPreference: true,
  popularCoursesPreference: true,
  activityFeedPreference: true,
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardPreferenceReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_TASK_PREFERENCE:
        draft.taskPreference = action.payload;
        break;
      case CHANGE_EVENT_PREFERENCE:
        draft.eventPreference = action.payload;
        break;
      case CHANGE_CALENDAR_PREFERENCE:
        draft.calendarPreference = action.payload;
        break;
      case CHANGE_POPULAR_COURSE_PREFERENCE:
        draft.popularCoursesPreference = action.payload;
        break;
      case CHANGE_COURSE_PROGRESS_PREFERENCE:
        draft.courseProgressPreference = action.payload;
        break;
      case CHANGE_ACTIVITY_FEED_PREFERENCE:
        draft.activityFeedPreference = action.payload;
        break;
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_PREFERENCES:
        draft.taskPreference = action.payload.task;
        draft.calendarPreference = action.payload.calendar;
        draft.eventPreference = action.payload.event;
        draft.courseProgressPreference = action.payload.courseProgress;
        draft.popularCoursesPreference = action.payload.popularCourses;
        draft.activityFeedPreference = action.payload.activityFeed;
        break;
    }
  });

export default dashboardPreferenceReducer;
