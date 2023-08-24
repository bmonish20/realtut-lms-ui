import _get from "lodash/get";

export const createdByName = (createdBy) => _get(createdBy, "name", "Trainer");
export const createdByPicture = (createdBy) => _get(createdBy, "picture", null);
export const createdById = (createdBy) => _get(createdBy, "_id", null);

export const getUserId = (cookie) => _get(cookie, "user.id", null);
