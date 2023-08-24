import _get from "lodash/get";

export const title = (state) => _get(state, "addPoll.title", null);
export const options = (state) => _get(state, "addPoll.options", null);

export const isLoading = (state) => _get(state, "addPoll.isLoading", false);
