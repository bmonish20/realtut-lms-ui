import _get from "lodash/get";

export const title = (state) => _get(state, "addLesson.title", "");
export const type = (state) => _get(state, "addLesson.type", null);
export const level = (state) => _get(state, "addLesson.level", null);
export const link = (state) => _get(state, "addLesson.link", "");
export const dateTime = (state) => _get(state, "addLesson.dateTime", "");
export const tags = (state) => _get(state, "addLesson.tags", []);
export const videoLink = (state) => _get(state, "addLesson.videoLink", "");
export const validations = (state) =>
  _get(state, "addLesson.validations", null);
export const isSubmitting = (state) =>
  _get(state, "addLesson.isSubmitting", false);
export const isEdit = (state) => _get(state, "addLesson.isEdit", false);
export const recurrence = (state) => _get(state, "addLesson.recurrence", null);
export const recurrenceType = (state) =>
  _get(state, "addLesson.recurrence.type", null);
