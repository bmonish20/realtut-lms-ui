/*
 *
 * Dashboard actions
 *
 */
import _get from "lodash/get";
import moment from "moment-timezone";
import {
  DASHBOARD_UPDATE_EVENTS,
  DASHBOARD_UPDATE_SIDEBAR_EVENTS,
  DASHBOARD_SET_LOADING,
  DASHBOARD_SET_PREFERENCES,
  DOWNLOAD_PROFILE_FAILED,
  DOWNLOAD_PROFILE_SUCCESS,
} from "./constants";
import {
  fetchUpcomingEvents,
  getTasks,
  downloadFile,
  fetchSpecificEvent,
  fetchCourseProgress,
  getCourses,
  getActivityFeed,
} from "./dashboardApi";
import { fetchPreference } from "../DashboardPreference/dashboardPreferenceApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchUserPreference = (id) => {
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

export const fetchEventOnDate = (startDate, endDate) => {
  return async (dispatch) => {
    try {
      const eventsOnDate = await fetchSpecificEvent(startDate, endDate);
      dispatch(updateEventsOnDate(eventsOnDate));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Event on Specific Date",
      });
    }
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const events = await fetchUpcomingEvents(moment().format("MM/DD/YYYY"));
      const { data: tasks } = await getTasks();
      const { data: courseProgress } = await fetchCourseProgress();
      const { data: popularCourses } = await getCourses(
        moment().format("MM/DD/YYYY")
      );
      const { data: activityFeed } = await getActivityFeed();
      dispatch(
        updateEvents({
          events,
          tasks: tasks.docs,
          courseProgress,
          popularCourses,
          activityFeed,
        })
      );
      return;
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Events & Tasks",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const setPreferences = (payload) => ({
  type: DASHBOARD_SET_PREFERENCES,
  payload,
});

const setLoading = (payload) => ({
  type: DASHBOARD_SET_LOADING,
  payload,
});

const updateEvents = (payload) => ({
  type: DASHBOARD_UPDATE_EVENTS,
  payload,
});

export const updateEventsOnDate = (payload) => ({
  type: DASHBOARD_UPDATE_SIDEBAR_EVENTS,
  payload,
});

export const profileDownloadSuccess = (imageUrl) => ({
  type: DOWNLOAD_PROFILE_SUCCESS,
  payload: imageUrl,
});

export const profileDownloadFailed = (imageUrl) => ({
  type: DOWNLOAD_PROFILE_FAILED,
  payload: imageUrl,
});

export const downloadProfilePicture = (email) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await downloadFile(email);
      dispatch(profileDownloadSuccess(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error---", error);
      dispatch(profileDownloadFailed(error));
      dispatch(setLoading(false));
    }
  };
};
