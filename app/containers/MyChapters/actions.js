/*
 *
 * MyChapters actions
 *
 */

import _get from "lodash/get";
import { INIT_PAGE, SET_CHAPTERS, SET_LOADING } from "./constants";
import { fetchChaptersApi, deleteChapterApi } from "./chaptersApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchChapters = () => {
  return async dispatch => {
    try {
      const { data } = await fetchChaptersApi();
      dispatch(setCourses(data));
      dispatch(setLoading(false));
    }
    catch(err) {
      dispatch(setLoading(false));
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to fetch Courses'
      });
    }
  }
}

export const onDelete = id => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await deleteChapterApi(id);
      dispatch(fetchChapters());
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to delete the Courses'
      });
      dispatch(setLoading(false));
    }
  }
}

const setCourses = payload => ({
  type: SET_CHAPTERS,
  payload
});

const setLoading = payload => ({
  type: SET_LOADING,
  payload
});

export const initPage = () => ({
  type: INIT_PAGE,
});
