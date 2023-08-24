/*
 *
 * Courses actions
 *
 */

import _get from "lodash/get";
import { getCourses, deleteCourse, getPastCourses } from "./coursesApi";
import { SET_COURSES, SET_LOADING, SET_COURSE_PAGE_TYPE } from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import moment from "moment-timezone";

export const fetchCourses = (coursePageType) => {
  return async (dispatch) => {
    try {
      const { data } = await getCourses(moment().format("MM/DD/YYYY"));
      dispatch(setCourses(data));
      dispatch(setCoursePageType(coursePageType));
    } catch (err) {
      console.log(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Courses New",
      });
      dispatch(setLoading(false));
    }
  };
};

export const fetchPastCourses = (coursePageType) => {
  return async (dispatch) => {
    try {
      const { data } = await getPastCourses(moment().format("MM/DD/YYYY"));
      dispatch(setCourses(data));
      dispatch(setCoursePageType(coursePageType));
    } catch (err) {
      console.log(err);
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Courses Past",
      });
      dispatch(setLoading(false));
    }
  };
};

export const onDelete = (id, coursePageType) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteCourse(id);
      dispatch(fetchCourses(coursePageType));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Courses",
      });
      dispatch(setLoading(false));
    }
  };
};

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

const setCourses = (payload) => ({
  type: SET_COURSES,
  payload,
});

const setCoursePageType = (payload) => ({
  type: SET_COURSE_PAGE_TYPE,
  payload,
});
