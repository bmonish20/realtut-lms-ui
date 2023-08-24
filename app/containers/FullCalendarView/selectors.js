import _get from "lodash/get";

export const upcomingEvents = (state) =>
  _get(state, "fullCalendarView.upcomingEvents", []);

export const upcomingClasses = (state) =>
  _get(state, "fullCalendarView.upcomingClasses", []);

export const isLoading = (state) =>
  _get(state, "fullCalendarView.isLoading", true);
