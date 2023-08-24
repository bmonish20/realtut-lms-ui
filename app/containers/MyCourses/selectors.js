import _get from "lodash/get";

export const courses = state => _get(state, "myCourses.courses", []);
export const isLoading = state => _get(state, "myCourses.isLoading", []);

