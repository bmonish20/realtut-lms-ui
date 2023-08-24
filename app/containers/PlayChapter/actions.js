/*
 *
 * PlayChapter actions
 *
 */

import _get from "lodash/get";
import { INIT_PAGE, SET_COURSE_DETAILS, SET_RESUME_FROM } from "./constants";
import { fetchCourseDetails } from "../Course/courseApi";
import { setCourseProgress, fetchScore } from "./courseApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchCourse = (id, resumeFrom, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchCourseDetails(id);
      data.quizzes.map(async (quiz) => {
        try {
          const {
            data: [{ id, response }],
          } = await fetchScore(quiz.id, userId);
          quiz["quizResponseId"] = id;
          quiz["response"] = response;
        } catch (err) {}
      });
      await setCourseProgress(id, resumeFrom);
      dispatch(setCourseDetails({ ...data, resumeFrom }));
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

export const playChapter = (id, progress) => {
  return async (dispatch) => {
    try {
      dispatch(setResumeFrom(progress));
      await setCourseProgress(id, progress);
    } catch (err) {}
  };
};

export const initPage = () => ({
  type: INIT_PAGE,
});

const setResumeFrom = (payload) => ({
  type: SET_RESUME_FROM,
  payload,
});

const setCourseDetails = (payload) => ({
  type: SET_COURSE_DETAILS,
  payload,
});
