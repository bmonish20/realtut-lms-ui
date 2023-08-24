/*
 *
 * Dashboard reducer
 *
 */
import produce from "immer";
import {
  DASHBOARD_UPDATE_EVENTS,
  DASHBOARD_UPDATE_SIDEBAR_EVENTS,
  DASHBOARD_SET_LOADING,
  DASHBOARD_SET_PREFERENCES,
  DOWNLOAD_PROFILE_SUCCESS,
  DOWNLOAD_PROFILE_FAILED,
} from "./constants";
import _ from "lodash";

export const initialState = {
  upcomingEvents: [],
  tasks: [],
  courseProgress: [],
  popularCourses: [],
  activityFeed: [],
  sidebarEvents: [],
  isLoading: false,
  profilePicture: "",
  preferences: {},
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DASHBOARD_UPDATE_EVENTS: {
        draft.upcomingEvents = action.payload.events;
        draft.tasks = action.payload.tasks;
        draft.courseProgress = action.payload.courseProgress;
        draft.popularCourses = _.orderBy(
          action.payload.popularCourses,
          ["registeredUsers"],
          ["desc"]
        ).slice(0, 3);
        draft.activityFeed = action.payload.activityFeed;
        break;
      }
      case DASHBOARD_UPDATE_SIDEBAR_EVENTS:
        draft.sidebarEvents = action.payload;
        break;
      case DASHBOARD_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case DOWNLOAD_PROFILE_SUCCESS:
        draft.profilePicture = action.payload;
        break;
      case DOWNLOAD_PROFILE_FAILED:
        draft.profilePicture = "";
        break;
      case DASHBOARD_SET_PREFERENCES:
        draft.preferences = action.payload;
        break;
    }
  });

export default dashboardReducer;
