import _get from "lodash/get";

export const taskPreference = (state) =>
  _get(state, "dashboardPreference.taskPreference", true);
export const eventPreference = (state) =>
  _get(state, "dashboardPreference.eventPreference", true);
export const calendarPreference = (state) =>
  _get(state, "dashboardPreference.calendarPreference", true);
export const courseProgressPreference = (state) =>
  _get(state, "dashboardPreference.courseProgressPreference", true);
export const popularCoursesPreference = (state) =>
  _get(state, "dashboardPreference.popularCoursesPreference", true);
export const activityFeedPreference = (state) =>
  _get(state, "dashboardPreference.activityFeedPreference", true);

export const isLoading = (state) =>
  _get(state, "dashboardPreference.isLoading", false);
