import _get from "lodash/get";

export const notifications = (state) =>
  _get(state, "rtNavBar.notifications", []);
export const unreadNotifications = (state) =>
  _get(state, "rtNavBar.unreadNotifications", 0);
