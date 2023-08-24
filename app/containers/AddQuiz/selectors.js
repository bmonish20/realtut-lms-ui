import _get from "lodash/get";

export const title = (state) => _get(state, "addQuizPage.title", null);
export const forCourse = (state) => _get(state, "addQuizPage.forCourse", null);
export const duration = (state) => _get(state, "addQuizPage.duration", null);
export const availableQuestions = (state) =>
  _get(state, "addQuizPage.availableQuestions", []);
export const questions = (state) => _get(state, "addQuizPage.questions", []);

export const isLoading = (state) => _get(state, "addQuizPage.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addQuizPage.errorMessage", null);
export const validations = (state) =>
  _get(state, "addQuizPage.validationError", null);
export const isEdit = (state) => _get(state, "addQuizPage.isEdit", false);
