import _get from "lodash/get";

export const firstName = (state) => _get(state, "editUser.firstName", null);
export const lastName = (state) => _get(state, "editUser.lastName", null);
export const email = (state) => _get(state, "editUser.email", null);
export const phoneNumber = (state) => _get(state, "editUser.phoneNumber", null);
export const role = (state) => _get(state, "editUser.role", null);
export const enabled = (state) => _get(state, "editUser.enabled", true);

export const isLoading = (state) => _get(state, "editUser.isLoading", false);
export const validations = (state) =>
  _get(state, "editUser.validationError", null);
