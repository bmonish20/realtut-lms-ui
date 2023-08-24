import _get from "lodash/get";

export const getWrittenBy = writtedBy => _get(writtedBy, "name", "Trainer");
export const getWrittedByPicture = writtenBy => _get(writtenBy, "picture", null);
export const getWrittedById = writtenBy => _get(writtenBy, "_id", null);

export const title = state => _get(state ,"article.title", null);
export const category = state => _get(state ,"article.category", null);
export const discription = state => _get(state ,"article.description", null);
export const writtedById = state => _get(state ,"article.writtedById", null);
export const writtedBy = state => _get(state ,"article.writtedBy", null);
export const writtedByPicture = state => _get(state ,"article.writtedByPicture", null);
export const createdAt = state => _get(state ,"article.createdAt", null);
export const readDurationInMins = state => _get(state ,"article.readDurationInMins", null);
export const isLoading = state => _get(state ,"article.isLoading", false);
export const likes = state => _get(state ,"article.likes", false);
export const isLiked = state => _get(state ,"article.isLiked", false);

export const getUserId = cookie => _get(cookie, 'user.id', null);