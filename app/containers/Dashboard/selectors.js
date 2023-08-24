import _get from "lodash/get";

export const userName = (cookie) => _get(cookie, "user.name", "firstName");

export const upcomingEvents = (state) =>
  _get(state, "dashboard.upcomingEvents", []);

export const sidebarEvents = (state) =>
  _get(state, "dashboard.sidebarEvents", []);

export const isLoading = (state) => _get(state, "dashboard.isLoading", false);

export const tasks = (state) => _get(state, "dashboard.tasks", []);

export const courseProgress = (state) =>
  _get(state, "dashboard.courseProgress", []);

export const popularCourses = (state) =>
  _get(state, "dashboard.popularCourses", []);

export const activityFeed = (state) =>
  _get(state, "dashboard.activityFeed", []);

export const preferences = (state) => _get(state, "dashboard.preferences", {});

export const loggedUserEmail = (cookie) => _get(cookie, "user.email", "email");
