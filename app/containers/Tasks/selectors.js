import _get from "lodash/get";

export const isLoading = (state) => _get(state, "tasks.isLoading", true);
export const selectedStatus = (state) =>
  _get(state, "tasks.selectedStatus", null);
export const tasks = (state) => _get(state, "tasks.tasks", []);
export const paginationDetails = (state) =>
  _get(state, "tasks.paginationDetails", {});
