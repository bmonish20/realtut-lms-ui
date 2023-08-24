/*
 *
 * AddLesson actions
 *
 */

import _get from "lodash/get";
import {
  INIT,
  CHANGE_TITLE,
  CHANGE_TYPE,
  CHANGE_LEVEL,
  CHANGE_LINK,
  CHANGE_DATE,
  CHANGE_TAG,
  SET_SUBMITTING,
  VALIDATION_ERROR,
  SET_LESSON_DETAILS,
  SET_RECURRENCE,
} from "./constants";
import schema from "./validations";
import { addLessonApi, fetchLessonApi, updateLessonApi } from "./lessonApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (details, postAdd, next) => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitting(true));
      const isValid = await schema.isValid(details);
      if (!isValid) {
        const err = await schema.validate(details).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      const {
        data: { id, title },
      } = await addLessonApi(details);
      NotificationHandler.open({
        operation: "success",
        title: "Lesson added successfully",
      });
      postAdd({ id, title });
      dispatch(initPage());
      next();
    } catch (err) {
      dispatch(setSubmitting(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create the Course",
      });
    }
  };
};

export const onEdit = (lessonId, details, postAdd, next) => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitting(true));
      const isValid = await schema.isValid(details);
      if (!isValid) {
        const err = await schema.validate(details).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      await updateLessonApi(lessonId, details);
      postAdd({ id: lessonId, title: details.title });
      NotificationHandler.open({
        operation: "success",
        title: "Lesson updated successfully",
      });
      dispatch(initPage());
      next();
    } catch (err) {
      dispatch(setSubmitting(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create the Course",
      });
    }
  };
};

export const fetchLesson = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchLessonApi(id);
      dispatch(setLessonDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to create the Course",
      });
    }
  };
};

export const initPage = () => ({
  type: INIT,
});

export const changeTitle = (payload) => ({
  type: CHANGE_TITLE,
  payload,
});

export const changeType = (payload) => ({
  type: CHANGE_TYPE,
  payload,
});

export const changeLevel = (payload) => ({
  type: CHANGE_LEVEL,
  payload,
});

export const changeLink = (payload) => ({
  type: CHANGE_LINK,
  payload,
});

export const changeDate = (payload) => ({
  type: CHANGE_DATE,
  payload,
});

export const changeTag = (payload) => ({
  type: CHANGE_TAG,
  payload,
});

const setSubmitting = (payload) => ({
  type: SET_SUBMITTING,
  payload,
});

const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

const setLessonDetails = (payload) => ({
  type: SET_LESSON_DETAILS,
  payload,
});

export const changeRecurrenceType = (payload) => ({
  type: SET_RECURRENCE,
  payload,
});
