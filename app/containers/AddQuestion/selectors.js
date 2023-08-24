import _get from "lodash/get";

export const question = (state) => _get(state, "addQuestion.question", null);
export const type = (state) => _get(state, "addQuestion.type", null);
export const mcqOptions = (state) => _get(state, "addQuestion.mcqOptions", []);
export const points = (state) => _get(state, "addQuestion.points", null);

export const isLoading = (state) => _get(state, "addQuestion.isLoading", false);
export const validationError = (state) =>
  _get(state, "addQuestion.validationError", null);
export const isEdit = (state) => _get(state, "addQuestion.isEdit", false);
