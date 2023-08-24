import _get from "lodash/get";

export const todoName = (state) => _get(state, "addTodo.todoName", null);
export const dueDate = (state) => _get(state, "addTodo.dueDate", null);
export const time = (state) => _get(state, "addTodo.time", null);
export const status = (state) => _get(state, "addTodo.status", null);
export const priority = (state) => _get(state, "addTodo.priority", null);
export const description = (state) => _get(state, "addTodo.description", null);

export const isLoading = (state) => _get(state, "addTodo.isLoading", false);
export const errorMessage = (state) =>
  _get(state, "addTodo.errorMessage", null);
export const validations = (state) =>
  _get(state, "addTodo.validationError", null);
export const isEdit = (state) => _get(state, "addTodo.isEdit", false);
