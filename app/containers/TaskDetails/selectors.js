import _get from "lodash/get";

export const taskName = (state) => _get(state, "taskDetails.taskName", "");
export const category = (state) => _get(state, "taskDetails.category", "");
export const subCategory = (state) =>
  _get(state, "taskDetails.subCategory", "");
export const client = (state) => _get(state, "taskDetails.client", "");
export const startDate = (state) => _get(state, "taskDetails.startDate", "");
export const dueDate = (state) => _get(state, "taskDetails.dueDate", "");
export const time = (state) => _get(state, "taskDetails.time", "");
export const priority = (state) => _get(state, "taskDetails.priority", "");
export const description = (state) =>
  _get(state, "taskDetails.description", "");
export const status = (state) => _get(state, "taskDetails.status", "");
export const fileUrl = (state) => _get(state, "taskDetails.fileUrl", []);
export const timeLeft = (state) => _get(state, "taskDetails.timeLeft", "");
