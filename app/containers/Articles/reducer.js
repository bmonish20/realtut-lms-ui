/*
 *
 * Articles reducer
 *
 */
import produce from "immer";
import { 
  SET_ARTICLES,
  SET_LOADING,
  SET_ARTICLE_TYPE,
  SET_CATEGORY_TYPE,
  SET_CATEGORY_LIST,

  ALL_CATEGORIES,
  ALL_PUBLICATION
} from "./constants";

export const initialState = {
  isLoading: true,
  articles: [],
  articleType: ALL_PUBLICATION,
  categoryList: [],
  category: ALL_CATEGORIES
};

/* eslint-disable default-case, no-param-reassign */
const articlesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ARTICLES: {
        draft.isLoading = false;
        draft.articles = action.payload;
        break;
      }
      case SET_LOADING: 
        draft.isLoading = action.payload;
        break;
      case SET_ARTICLE_TYPE: {
        draft.articleType = action.payload;
        break;
      }
      case SET_CATEGORY_TYPE:
        draft.category = action.payload;
        break;
      case SET_CATEGORY_LIST:
        draft.categoryList = [ALL_CATEGORIES, ...action.payload];
    }
  });

export default articlesReducer;
