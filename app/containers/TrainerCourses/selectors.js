import _get from "lodash/get";
import { NEW_COURSES } from "./constants";

export const isLoading = (state) =>
  _get(state, "trainerCourses.isLoading", true);
export const courses = (state) => _get(state, "trainerCourses.courses", []);
export const coursePageType = (state) =>
  _get(state, "trainerCourses.coursePageType", NEW_COURSES);
