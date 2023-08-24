import _get from "lodash/get";

export const title = state => _get(state, "addArticle.title", '');
export const category = state => _get(state, "addArticle.category", null);
export const description = state => _get(state, "addArticle.description", '');
export const isDraft = state => _get(state, "addArticle.isDraft", true);
export const isEdit = state => _get(state, "addArticle.isEdit", false);
export const isSubmitting = state => _get(state, "addArticle.isSubmitting", false);
export const validationError = state => _get(state, "addArticle.validationError", {});
export const categoryList = state => _get(state, "addArticle.categoryList", []);
export const imgUrl = state => _get(state, "addArticle.imgUrl", null);
export const imgData = state => _get(state, "addArticle.imgData", null);