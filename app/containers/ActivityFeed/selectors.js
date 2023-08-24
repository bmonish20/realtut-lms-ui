import _get from "lodash/get";

export const isLoading = (state) => _get(state, "activityFeed.isLoading", true);
export const activities = (state) => _get(state, "activityFeed.activities", []);
