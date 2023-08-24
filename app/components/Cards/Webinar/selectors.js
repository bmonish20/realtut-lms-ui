import _get from "lodash/get";

export const hostedById = hostedBy => _get(hostedBy, '_id', null);
export const hostedByName = hostedBy => _get(hostedBy, 'name', null);
export const hostedByPicture = hostedBy => _get(hostedBy, 'picture', null);
export const hostedByTitle = hostedBy => "Host";

export const getUserId = cookie => _get(cookie, 'user.id', null);