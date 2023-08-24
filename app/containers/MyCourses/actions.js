/*
 *
 * MyCourses actions
 *
 */

import _get from "lodash/get";
import { SET_COURSES, SET_LOADING } from "./constants";
import { fetchCoursesApi } from "./coursesApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchCourses = () => {
  return async dispatch => {
    try {
      const { data } = await fetchCoursesApi();
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

const setCourses = payload => ({
  type: SET_COURSES,
  payload
});

const setLoading = payload => ({
  type: SET_LOADING,
  payload
});