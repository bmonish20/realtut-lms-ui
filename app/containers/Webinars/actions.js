/*
 *
 * Webinars actions
 *
 */

import _get from "lodash/get";
import moment from "moment-timezone";
import { UPDATE_WEBINAR_LIST, EVENT_PAGE_SET_LOADING, SET_WEBINAR_TYPE} from "./constants";
import { fetchUpcomingEvents, fetchPastEvents, getWebinars, deleteWebinar } from "./webinarApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import history from '../../utils/history';

export const fetchWebinars = (webinarType) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const {data: webinars} = await fetchUpcomingEvents(moment().format("MM/DD/YYYY"));
      dispatch(updateWebinarList(webinars));
      dispatch(changeWebinarType(webinarType));
      dispatch(setLoading(false));
    }
    catch(err) {
      dispatch(updateWebinarList());
      dispatch(setLoading(false));
    }
  }
}

export const fetchPastWebinars = (webinarType) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const {data: webinars} = await fetchPastEvents(moment().format("MM/DD/YYYY"));
      dispatch(updateWebinarList(webinars));
     dispatch(changeWebinarType(webinarType));
     dispatch(setLoading(false));
    }
    catch(err) {
      dispatch(updateWebinarList());
      dispatch(setLoading(false));
    }
  }
}

export const deleteEvent = (id) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await deleteWebinar(id);
      dispatch(fetchWebinars());
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to delete the Event'
      });
      dispatch(setLoading(false));
    }
  }
}
export const changeWebinarType = (payload) => ({
 type: SET_WEBINAR_TYPE ,
  payload
});


export const setLoading = (payload) => ({
  type: EVENT_PAGE_SET_LOADING,
  payload
});

export const updateWebinarList = (payload) => ({
  type: UPDATE_WEBINAR_LIST,
  payload
});