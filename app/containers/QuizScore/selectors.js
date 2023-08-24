import _get from "lodash/get";

export const isLoading = (state) => _get(state, "quizScore.isLoading", true);

export const quizId = (state) => _get(state, "quizScore.quizId", null);
export const attendedBy = (state) => _get(state, "quizScore.attendedBy", null);
export const response = (state) => _get(state, "quizScore.response", []);
export const totalScore = (state) => _get(state, "quizScore.totalScore", 0);
