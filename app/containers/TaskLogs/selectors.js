import _get from "lodash/get";

export const taskName = (state) => _get(state, "taskLogs.taskName", "");
export const logs = (state) => _get(state, "taskLogs.logs", []);
export const isLoading = (state) => _get(state, "taskLogs.isLoading", true);
