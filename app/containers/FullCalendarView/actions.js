/*
 *
 * FullCalendarView actions
 *
 */
import _get from "lodash/get";
import moment from "moment-timezone";
import { FULLCALENDAR_EVENTS, FULLCALENDAR_SET_LOADING } from "./constants";
import { fetchUpcomingEvents, fetchCoursesApi } from "./fullCalendarApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchEventsAndCourses = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const events = await fetchUpcomingEvents(moment().format("MM/DD/YYYY"));
      const { data } = await fetchCoursesApi();
      dispatch(updateEventsAndCourses({ events, courses: data }));
      return;
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Events",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const setLoading = (payload) => ({
  type: FULLCALENDAR_SET_LOADING,
  payload,
});

const updateEventsAndCourses = (payload) => ({
  type: FULLCALENDAR_EVENTS,
  payload,
});
