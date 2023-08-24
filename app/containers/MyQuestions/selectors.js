import _get from "lodash/get";

export const isLoading = (state) => _get(state, "myQuestions.isLoading", true);
export const questions = (state) => _get(state, "myQuestions.questions", []);
