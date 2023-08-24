import _get from "lodash/get";

export const notifications = (state) =>
  _get(state, "userNotifications.notifications", []);
export const unreadNotifications = (state) =>
  _get(state, "userNotifications.unreadNotifications", 0);
