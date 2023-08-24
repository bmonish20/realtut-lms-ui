import _get from "lodash/get";

export const isLoading = (state) => _get(state, "review.isLoading", true);

export const quizId = (state) => _get(state, "review.quizId", null);
export const attendedBy = (state) => _get(state, "review.attendedBy", null);
export const response = (state) => _get(state, "review.response", []);

export const validations = (state) => _get(state, "review.validations", null);
