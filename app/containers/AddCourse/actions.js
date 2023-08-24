/*
 *
 * AddCourse actions
 *
 */

import _get from "lodash/get";
import {
  ADD_COURSE_INIT,
  CHANGE_TITLE,
  CHANGE_TYPE,
  CHANGE_START_DATE,
  CHANGE_SUMMARY,
  CHANGE_DURATION,
  CHANGE_DESCRIPTION,
  CHANGE_PREREQUISETE,
  CHANGE_TAGS,
  SET_SUBMITTING,
  VALIDATION_ERROR,
  SET_DETAILS,
  APPEND_CHAPTER,
  REMOVE_CHAPTER,
  SET_CHAPTERS_DROPDOWN,
  APPEND_QUIZ,
  REMOVE_QUIZ,
  SET_QUIZZES_DROPDOWN,
  EDIT_CHAPTERS,
  SET_IMAGE,
  PROFILE_PICTURE_MAX_SIZE,
} from "./constants";
import schema from "./validations";
import history from "../../utils/history";
import {
  addCourseApi,
  editCourseApi,
  fetchChaptersApi,
  fetchQuizzesApi,
  uploadFileApi,
} from "./courseApi";
import { fetchCourseDetails } from "../Course/courseApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (courseDetails, image) => {
  return async (dispatch) => {
    try {
      const isValid = await schema.isValid(courseDetails);
      if (!isValid) {
        const err = await schema.validate(courseDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var tagsArray = [],
        chapters = [],
        quizzes = [];
      dispatch(setSubmitting(true));
      courseDetails.tags.map((tag) => {
        tagsArray.push(tag.value);
      });
      courseDetails.chapters.map(({ id }) => chapters.push(id));
      courseDetails.quizzes.map(({ id }) => quizzes.push(id));
      const {
        data: { id },
      } = await addCourseApi({
        ...courseDetails,
        tags: tagsArray,
        chapters,
        quizzes,
      });

      try {
        if (image) {
          let formData = new FormData();
          formData.append("file", image);
          const { data } = await uploadFileApi(id, formData);
        }
        NotificationHandler.open({
          operation: "success",
          title: "Course added successfully",
        });
        history.goBack();
      } catch (err) {
        NotificationHandler.open({
          operation: "warning",
          message:
            _get(err, "response.data", null) ||
            "Something went wrong. Please try again later",
          title: "Course created. But unable to upload image",
        });
      }
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

export const OnEdit = (id, courseDetails, image) => {
  return async (dispatch) => {
    try {
      const isValid = await schema.isValid(courseDetails);
      if (!isValid) {
        const err = await schema.validate(courseDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var tagsArray = [],
        chapters = [],
        quizzes = [];
      dispatch(setSubmitting(true));
      courseDetails.tags.map((tag) => {
        tagsArray.push(tag.value);
      });
      courseDetails.chapters.map(({ id }) => chapters.push(id));
      courseDetails.quizzes.map(({ id }) => quizzes.push(id));
      await editCourseApi(id, {
        ...courseDetails,
        tags: tagsArray,
        chapters,
        quizzes,
      });
    } catch (err) {
      dispatch(setSubmitting(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update the Course",
      });
    }
    try {
      if (image) {
        let formData = new FormData();
        formData.append("file", image);
        const { data } = await uploadFileApi(id, formData);
      }
      NotificationHandler.open({
        operation: "success",
        title: "Course updated successfully",
      });
    } catch (err) {
      NotificationHandler.open({
        operation: "warning",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Course updated. But unable to upload image",
      });
    }
    history.goBack();
  };
};

export const fetchCourse = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchCourseDetails(id);
      dispatch(setCourseDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch course details",
      });
    }
  };
};

export const fetchChapters = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetchChaptersApi();
      dispatch(setChaptersDropDown(data));
    } catch (err) {
      dispatch(setChaptersDropDown([]));
    }
  };
};

export const fetchQuizzes = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetchQuizzesApi();
      dispatch(setQuizzesDropDown(data));
    } catch (err) {
      dispatch(setQuizzesDropDown());
    }
  };
};

export const uploadImage = (file) => {
  return (dispatch) => {
    if (file.size < PROFILE_PICTURE_MAX_SIZE) {
      dispatch(setImage(file));
    } else {
      NotificationHandler.open({
        operation: "failure",
        message: "File size too large",
        title: "Cannot Upload Picture",
      });
    }
  };
};

export const setChaptersDropDown = (payload) => ({
  type: SET_CHAPTERS_DROPDOWN,
  payload,
});

export const setQuizzesDropDown = (payload) => ({
  type: SET_QUIZZES_DROPDOWN,
  payload,
});

export const appendChapter = (payload) => ({
  type: APPEND_CHAPTER,
  payload,
});

export const editChapter = (payload) => ({
  type: EDIT_CHAPTERS,
  payload,
});

export const removeChapter = (payload) => ({
  type: REMOVE_CHAPTER,
  payload,
});

export const appendQuiz = (payload) => ({
  type: APPEND_QUIZ,
  payload,
});

export const removeQuiz = (payload) => ({
  type: REMOVE_QUIZ,
  payload,
});

export const addCourseInit = () => ({
  type: ADD_COURSE_INIT,
});

export const setCourseDetails = (payload) => ({
  type: SET_DETAILS,
  payload,
});

export const changeTitle = (payload) => ({
  type: CHANGE_TITLE,
  payload,
});

export const changeType = (payload) => ({
  type: CHANGE_TYPE,
  payload,
});

export const changeStartDate = (payload) => ({
  type: CHANGE_START_DATE,
  payload,
});

export const changeDuration = (payload) => ({
  type: CHANGE_DURATION,
  payload,
});

export const changeSummary = (payload) => ({
  type: CHANGE_SUMMARY,
  payload,
});

export const changeDescription = (payload) => ({
  type: CHANGE_DESCRIPTION,
  payload,
});

export const changePrerequisete = (payload) => ({
  type: CHANGE_PREREQUISETE,
  payload,
});

export const changeTags = (payload) => ({
  type: CHANGE_TAGS,
  payload,
});

export const validationFailed = (payload) => ({
  type: VALIDATION_ERROR,
  payload,
});

export const setSubmitting = (payload) => ({
  type: SET_SUBMITTING,
  payload,
});

const setImage = (payload) => ({
  type: SET_IMAGE,
  payload,
});
