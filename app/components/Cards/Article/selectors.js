import _get from "lodash/get";

export const writtenById = writtedBy => _get(writtedBy, "_id", null);
export const writtenBy = writtedBy => _get(writtedBy, "name", "Trainer");
export const writtedByPicture = writtenBy => _get(writtenBy, "picture", null);

export const getUserId = cookie => _get(cookie, 'user.id', null);