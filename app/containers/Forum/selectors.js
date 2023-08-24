import _get from "lodash/get";

export const forumMessages = (state) => _get(state, "forum.forumMessages", []);
export const page = (state) => _get(state, "forum.page", 1);
export const inputText = (state) => _get(state, "forum.inputText", "");

export const getUserId = (cookie) => _get(cookie, "user.id", null);
export const userId = (userId) => _get(userId, "userId._id", null);
export const userName = (userId) => _get(userId, "userId.name", "user");
