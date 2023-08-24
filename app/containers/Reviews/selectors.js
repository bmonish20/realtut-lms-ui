import _get from "lodash/get";

export const isLoading = (state) => _get(state, "reviews.isLoading", true);

export const reviews = (state) => _get(state, "reviews.reviews", []);
