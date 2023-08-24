import _get from "lodash/get";

export const isLoading = (state) => _get(state, "quizForm.isLoading", true);
export const response = (state) => _get(state, "quizForm.response", []);
export const questions = (state) => _get(state, "quizForm.questions", []);
export const quiz = (state) => _get(state, "quizForm.quiz", {});
