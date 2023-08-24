import _get from "lodash/get";

export const name = (state) => _get(state, "inviteUser.name", "");
export const email = (state) => _get(state, "inviteUser.email", "");

export const isLoading = (state) => _get(state, "inviteUser.isLoading", false);
export const validations = (state) =>
  _get(state, "inviteUser.validations", false);
