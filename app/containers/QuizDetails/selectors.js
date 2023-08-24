import _get from "lodash/get";

export const isLoading = (state) => _get(state, "quizDetails.isLoading", true);
export const questions = (state) => _get(state, "quizDetails.questions", []);
export const quiz = (state) => _get(state, "quizDetails.quiz", {});
