/*
 *
 * Course actions
 *
 */

import _get from "lodash/get";
import { COURSE_DETAILS_INIT, SET_COURSE_DETAILS } from "./constants";
import {
  fetchCourseDetails,
  registerToCourse,
  removeRegistration,
  reviewCourse,
  updateReview,
  getPollDetails,
} from "./courseApi";
import { deleteCourse } from "../Courses/coursesApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import history from "utils/history";

export const fetchCourse = (courseId) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchCourseDetails(courseId);
      const { data: pollData } = await getPollDetails(courseId);
      dispatch(setCourseDetails({ ...data, poll: { ...pollData[0] } }));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Course details",
      });
    }
  };
};

export const reviewTheCourse = (id, rating) => {
  return async (dispatch) => {
    try {
      const { data } = await reviewCourse(id, rating);
      dispatch(fetchCourse(id));
      NotificationHandler.open({
        operation: "success",
        title: "Reviewed Course successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to review the Course",
      });
    }
  };
};

export const updateTheReview = (id, ratingId, rating) => {
  return async (dispatch) => {
    try {
      const { data } = await updateReview(ratingId, rating);
      dispatch(fetchCourse(id));
      NotificationHandler.open({
        operation: "success",
        title: "Updated your Course Review Successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update your review",
      });
    }
  };
};

export const registerUserToCourse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await registerToCourse(id);
      dispatch(fetchCourse(id));
      NotificationHandler.open({
        operation: "success",
        title: "Registered to Course successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to register to the Course",
      });
    }
  };
};

export const removeCourseRegistration = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await removeRegistration(id);
      dispatch(fetchCourse(id));
      NotificationHandler.open({
        operation: "warning",
        title: `You have been successfully de-registered`,
        icon: "fas fa-smile-beam",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to de-register to the Course",
      });
    }
  };
};

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      await deleteCourse(id);
      history.push("/courses");
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Course",
      });
    }
  };
};

export const courseDetailsInit = () => ({
  type: COURSE_DETAILS_INIT,
});

const setCourseDetails = (payload) => ({
  type: SET_COURSE_DETAILS,
  payload,
});
