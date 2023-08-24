/*
 *
 * Articles actions
 *
 */

import _get from "lodash/get";
import NotificationHandler from "components/Notifications/NotificationHandler";
import { SET_ARTICLES, SET_ARTICLE_TYPE, SET_LOADING, SET_CATEGORY_TYPE, SET_CATEGORY_LIST } from "./constants";
import {
  getArticles,
  deleteArticle,
  likeArticle,
  unLikeArticle,
  getCategories
} from "./articlesApi";
import { userId } from "./selectors";

export const fetchArticles = (articleType, category, cookie) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const { data } = await getArticles(articleType, userId(cookie), category);
      dispatch(setArticles(data));
      dispatch(changeArticleType(articleType));
      dispatch(changeCategoryType(category));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to fetch Article'
      });
      dispatch(setLoading(false));
    }
  }
}

export const onDelete = (id, articleType, cookie, category) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await deleteArticle(id);
      dispatch(refreshCurrentContent(articleType, cookie, category));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to delete the Article'
      });
      dispatch(setLoading(false));
    }
  }
}

export const onLike = (id, articleType, cookie, category) => {
  return async dispatch => {
    try {
      await likeArticle(id);
      dispatch(refreshCurrentContent(articleType, cookie, category));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to like the Article'
      });
    }
  }
}

export const onUnlike = (id, articleType, cookie, category) => {
  return async dispatch => {
    try {
      await unLikeArticle(id);
      dispatch(refreshCurrentContent(articleType, cookie, category));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to unlike the Article'
      });
    }
  }
}

export const refreshCurrentContent = (articleType, cookie, category) => {
  return async dispatch => {
    try {
      const { data: articles } = await getArticles(articleType, userId(cookie), category)
      dispatch(setArticles(articles));
    }
    catch(err) {
      dispatch(fetchArticles());
    }
  }
}

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const { data } = await getCategories();
      dispatch(setCategoryList(data));
    }
    catch {
    }
  }
}

export const changeArticleType = (payload) => ({
  type: SET_ARTICLE_TYPE,
  payload
});

export const changeCategoryType = (payload) => ({
  type: SET_CATEGORY_TYPE,
  payload
});

const setLoading = payload => ({
  type: SET_LOADING,
  payload,
});

const setArticles = payload => ({
  type: SET_ARTICLES,
  payload
});

const setCategoryList = payload => ({
  type: SET_CATEGORY_LIST,
  payload
});
