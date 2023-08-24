import _get from "lodash/get";

export const title = (state) => _get(state, "course.title", null);
export const type = (state) => _get(state, "course.type", null);
export const date = (state) => _get(state, "course.date", null);
export const time = (state) => _get(state, "course.time", null);
export const startDate = (state) => _get(state, "course.startDate", null);
export const hostedBy = (state) => _get(state, "course.hostedBy", null);
export const hostedBypictureUrl = (state) =>
  _get(state, "course.hostedBypictureUrl", null);
export const hostedById = (state) => _get(state, "course.hostedById", null);
export const shortDescription = (state) =>
  _get(state, "course.shortDescription", null);
export const description = (state) => _get(state, "course.description", null);
export const prerequisite = (state) => _get(state, "course.prerequisite", null);
export const tags = (state) => _get(state, "course.tags", []);
export const chapters = (state) => _get(state, "course.chapters", []);
export const isUserRegistered = (state) =>
  _get(state, "course.isUserRegistered", null);
export const isUserReviewed = (state) =>
  _get(state, "course.isUserReviewed", null);
export const rating = (state) => _get(state, "course.rating", 0);
export const ratingId = (state) => _get(state, "course.ratingId", null);
export const courseRating = (state) => _get(state, "course.courseRating", 0);
export const isLoading = (state) => _get(state, "course.isLoading", null);
export const pollId = (state) => _get(state, "course.pollId", null);
export const pollQuestion = (state) => _get(state, "course.pollQuestion", null);
export const pollAnswers = (state) => _get(state, "course.pollAnswers", null);
export const forumMessagesLength = (state) =>
  _get(state, "course.forumMessagesLength", 0);

export const courseId = (location) => _get(location, "state.id", null);

export const getHostedBy = (action) =>
  _get(action, "payload.hostedBy.name", null);
export const getHostedByPictureUrl = (action) =>
  _get(action, "payload.hostedBy.picture", null);
export const getHostedById = (action) =>
  _get(action, "payload.hostedBy._id", null);

export const getUserId = (cookie) => _get(cookie, "user.id", null);
