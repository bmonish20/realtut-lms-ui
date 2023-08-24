import _get from "lodash/get";

export const userId = cookie => _get(cookie, 'user.id', null);

export const hostedBy = hostedBy => _get(hostedBy, '_id', null);
export const hostedByName = hostedBy => _get(hostedBy, "name", "Trainer");
export const hostedByPicture = hostedBy => _get(hostedBy, "picture", null);