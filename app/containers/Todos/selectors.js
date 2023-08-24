import _get from "lodash/get";

export const isLoading = (state) => _get(state, "todos.isLoading", true);

export const todos = (state) => _get(state, "todos.todos", []);
