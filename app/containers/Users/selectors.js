import _get from "lodash/get";

export const isLoading = (state) => _get(state, "usersPage.isLoading", true);
export const role = (state) => _get(state, "usersPage.role", null);
export const searchString = (state) =>
  _get(state, "usersPage.searchString", null);

export const users = (state) => _get(state, "usersPage.users", []);
