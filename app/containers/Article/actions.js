/*
 *
 * Article actions
 *
 */
import _get from "lodash/get";
import NotificationHandler from "components/Notifications/NotificationHandler";
import history from "utils/history";
import { SET_ARTICLE, INIT } from "./constants";
import { fetchArticleDetails } from "./articleApi";
import { deleteArticle, likeArticle, unLikeArticle } from "../Articles/articlesApi";

export const fetchArticle = id => {
  return async dispatch => {
    try {
      const { data } = await fetchArticleDetails(id);
      dispatch(setArticle(data));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to fetch Course details'
      });
    }
  }
}

export const onDelete = id => {
  return async dispatch => {
    try {
      await deleteArticle(id);
      history.push('/resources');
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to delete the Article'
      });
    }
  }
}

export const onLike = id => {
  return async dispatch => {
    try {
      await likeArticle(id);
      const { data } = await fetchArticleDetails(id);
      dispatch(setArticle(data));
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

export const onUnlike = id => {
  return async dispatch => {
    try {
      await unLikeArticle(id);
      const { data } = await fetchArticleDetails(id);
      dispatch(setArticle(data));
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

export const articleInit = () => ({
  type: INIT
});

const setArticle = payload => ({
  type: SET_ARTICLE,
  payload
});
