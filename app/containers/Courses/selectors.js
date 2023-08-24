import _get from "lodash/get";
import { NEW_COURSES } from "./constants";

export const isLoading = (state) => _get(state, "coursesPage.isLoading", true);
export const courses = (state) => _get(state, "coursesPage.courses", []);
export const coursePageType = (state) =>
  _get(state, "coursesPage.coursePageType", NEW_COURSES);
