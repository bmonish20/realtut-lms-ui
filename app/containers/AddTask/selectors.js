import _get from "lodash/get";

export const taskName = (state) => _get(state, "addTaskPage.taskName", null);
export const category = (state) => _get(state, "addTaskPage.category", null);
export const subCategory = (state) =>
  _get(state, "addTaskPage.subCategory", null);
export const client = (state) => _get(state, "addTaskPage.client", null);
export const startDate = (state) => _get(state, "addTaskPage.startDate", "");
export const dueDate = (state) => _get(state, "addTaskPage.dueDate", "");
export const time = (state) => _get(state, "addTaskPage.time", null);
export const status = (state) => _get(state, "addTaskPage.status", null);
export const priority = (state) => _get(state, "addTaskPage.priority", null);
export const description = (state) =>
  _get(state, "addTaskPage.description", null);
export const assignedTo = (state) =>
  _get(state, "addTaskPage.assignedTo", null);
export const logs = (state) => _get(state, "addTaskPage.logs", []);
export const fileUrl = (state) => _get(state, "addTaskPage.fileUrl", []);
export const signedFileUrls = (state) =>
  _get(state, "addTaskPage.signedFileUrls", []);

export const isLoading = (state) => _get(state, "addTaskPage.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addTaskPage.errorMessage", null);
export const validations = (state) =>
  _get(state, "addTaskPage.validationError", null);
export const isEdit = (state) => _get(state, "addTaskPage.isEdit", false);
export const availableUsers = (state) =>
  _get(state, "addTaskPage.availableUsers", []);
