import _get from "lodash/get";

export const title = (state) => _get(state, "addCourse.title", "");
export const type = (state) => _get(state, "addCourse.type", "");
export const startDate = (state) => _get(state, "addCourse.startDate", "");
export const duration = (state) => _get(state, "addCourse.duration", "");
export const summary = (state) => _get(state, "addCourse.shortDescription", "");
export const description = (state) => _get(state, "addCourse.description", "");
export const languages = (state) => _get(state, "addCourse.languages", "");
export const prerequisite = (state) =>
  _get(state, "addCourse.prerequisite", "");
export const tags = (state) => _get(state, "addCourse.tags", []);
export const isSubmitting = (state) =>
  _get(state, "addCourse.isSubmitting", false);
export const validationError = (state) =>
  _get(state, "addCourse.validationError", null);
export const isEdit = (state) => _get(state, "addCourse.isEdit", false);
export const chapters = (state) => _get(state, "addCourse.chapters", []);
export const quizzes = (state) => _get(state, "addCourse.quizzes", []);
export const availableChapters = (state) =>
  _get(state, "addCourse.availableChapters", []);
export const availableQuizzes = (state) =>
  _get(state, "addCourse.availableQuizzes", []);
export const imgUrl = (state) => _get(state, "addCourse.imgUrl", null);
export const imgData = (state) => _get(state, "addCourse.imgData", null);
