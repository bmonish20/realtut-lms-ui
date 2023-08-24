import _get from "lodash/get";

export const title = (state) => _get(state, "addEventPage.title", null);

export const dateTime = (state) => _get(state, "addEventPage.dateTime", null);

export const participants = (state) =>
  _get(state, "addEventPage.participants", null);

export const shortDescription = (state) => _get(state, "addEventPage.shortDescription", null);

export const description = (state) =>
  _get(state, "addEventPage.description", null);

export const tags = (state) => _get(state, "addEventPage.tags", null);

export const webinarLink = (state) => _get(state, "addEventPage.webinarLink", null);

export const type = (state) => _get(state, "addEventPage.type", null);

export const isLoading = (state) =>
  _get(state, "addEventPage.isLoading", false);

export const errorMessage = (state) =>
  _get(state, "addEventPage.errorMessage", null);

export const validations = (state) =>
  _get(state, "addEventPage.validationError", null);

export const isEdit = state => _get(state, "addEventPage.isEdit", false);

export const recurrence = state => _get(state, "addEventPage.recurrence", null);

export const recurrenceType = state => _get(state, "addEventPage.recurrence.type", null);
