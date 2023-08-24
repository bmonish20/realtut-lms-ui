import _get from "lodash/get";

export const title = state => _get(state, "webinarDetail.title", null);
export const type = state => _get(state, "webinarDetail.type", null);
export const dateTime = state => _get(state, "webinarDetail.dateTime", null);
export const date = state => _get(state, "webinarDetail.date", null);
export const time = state => _get(state, "webinarDetail.time", null);
export const hostedById = state => _get(state, "webinarDetail.hostedById", null);
export const hostedBy = state => _get(state, "webinarDetail.hostedBy", null);
export const hostedByPictureUrl = state => _get(state, "webinarDetail.hostedByPictureUrl", null);
export const shortDescription = state => _get(state, "webinarDetail.shortDescription", null);
export const description = state => _get(state, "webinarDetail.description", null);
export const webinarLink = state => _get(state, "webinarDetail.webinarLink", null);
export const tags = state => _get(state, "webinarDetail.tags", []);
export const registeredCount = state => _get(state, "webinarDetail.registeredCount", false);
export const isUserRegistered = state => _get(state, "webinarDetail.isUserRegistered", false);
export const isLoading = state => _get(state, "webinarDetail.isLoading", true);

export const getUserId = cookie => _get(cookie, 'user.id', null);

export const getHostedBy = payload => _get(payload, 'hostedBy.name', null);
export const getHostedByPictureUrl = payload => _get(payload, 'hostedBy.picture', null);
export const getHostedById = payload => _get(payload, 'hostedBy._id', null);