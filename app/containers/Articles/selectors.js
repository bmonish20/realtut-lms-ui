import _get from "lodash/get";
import { ALL_PUBLICATION, ALL_CATEGORIES } from "./constants";

export const articles = state => _get(state, "articles.articles", []);
export const articleType = state => _get(state, "articles.articleType", ALL_PUBLICATION);
export const isLoading = state => _get(state, "articles.isLoading", false);
export const category = state => _get(state, "articles.category", ALL_CATEGORIES);
export const categoryList = state => _get(state, "articles.categoryList", []);

export const userId = cookie => _get(cookie, 'user.id', null);