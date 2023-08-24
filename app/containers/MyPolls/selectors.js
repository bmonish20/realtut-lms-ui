import _get from "lodash/get";

export const polls = (state) => _get(state, "myPolls.polls", []);
export const isLoading = (state) => _get(state, "myPolls.isLoading", []);
