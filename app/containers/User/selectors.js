import _get from "lodash/get";

export const isLoading = (state) => _get(state, "tasks.isLoading", true);

export const user = (state) => _get(state, "user.user", {});
