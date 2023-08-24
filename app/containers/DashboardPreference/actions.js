/*
 *
 * DashboardPreference actions
 *
 */

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
import _get from "lodash/get";
import { changePreference, fetchPreference } from "./dashboardPreferenceApi";
import history from "utils/history";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const getPreferences = (id) => {
  return async (dispatch) => {
    try {
      const {
        data: { dashboardPreference },
      } = await fetchPreference(id);
      dispatch(setPreferences(dashboardPreference));
    } catch (err) {
      dispatch(setPreferences());
    }
  };
};

export const onSubmit = (userId, details, next) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      var dashboardPreference = { ...details };
      await changePreference(userId, {
        dashboardPreference: dashboardPreference,
      });
      next();
      history.go(0);
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to set the preference",
      });
    }
  };
};

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

const setPreferences = (payload) => ({
  type: SET_PREFERENCES,
  payload,
});

export const changeTaskPreference = (payload) => ({
  type: CHANGE_TASK_PREFERENCE,
  payload,
});

export const changeEventPreference = (payload) => ({
  type: CHANGE_EVENT_PREFERENCE,
  payload,
});

export const changeCalendarPreference = (payload) => ({
  type: CHANGE_CALENDAR_PREFERENCE,
  payload,
});

export const changePopularCoursePreference = (payload) => ({
  type: CHANGE_POPULAR_COURSE_PREFERENCE,
  payload,
});

export const changeCourseProgressPreference = (payload) => ({
  type: CHANGE_COURSE_PROGRESS_PREFERENCE,
  payload,
});

export const changeActivityFeedPreference = (payload) => ({
  type: CHANGE_ACTIVITY_FEED_PREFERENCE,
  payload,
});
