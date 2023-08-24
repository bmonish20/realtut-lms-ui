import _get from "lodash/get";

export const isLoading = (state) => _get(state, "quizzes.isLoading", true);

export const quizzes = (state) => _get(state, "quizzes.quizzes", []);
