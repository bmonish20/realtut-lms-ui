/*
 *
 * Webinar actions
 *
 */

import _get from "lodash/get";
import { UPDATE_WEBINAR_DETAILS, WEBINAR_DETAILS_INIT } from "./constants";
import { fetchWebinarDetails, registerToEvent, removeRegistration } from "./webinarApi";
import { deleteWebinar } from "../Webinars/webinarApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import history from "utils/history";

export const fetchWebinar = (id) => {
  return async dispatch => {
    try {
      const { data } = await fetchWebinarDetails(id);
      dispatch(updateDetails(data));
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to fetch Event details'
      });
    }
  }
}

export const registerUserToEvent = (id) => {
  return async dispatch => {
    try {
      const { data } = await registerToEvent(id);
      dispatch(fetchWebinar(id));
      NotificationHandler.open({
        operation: 'success',
        title: 'Registered to Event successfully'
      });
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to register to the Event'
      });
    }
  }
}

export const removeEventRegistration = (id) => {
  return async dispatch => {
    try {
      const { data } = await removeRegistration(id);
      dispatch(fetchWebinar(id));
      NotificationHandler.open({
        operation: 'warning',
        title: `You have been successfully de-registered`,
        icon: 'fas fa-smile-beam'
      });
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to de-register to the Event'
      });
    }
  }
}

export const deleteEvent = (id) => {
  return async dispatch => {
    try {
      await deleteWebinar(id);
      history.push('/events');
    }
    catch(err) {
      NotificationHandler.open({
        operation: 'failure',
        message: _get(err, 'response.data', null) || 'Something went wrong. Please try again later',
        title: 'Unable to delete the Event'
      });
    }
  }
}

export const webinarDetailsInit = () => ({
  type: WEBINAR_DETAILS_INIT
})

const updateDetails = (payload) => ({
  type: UPDATE_WEBINAR_DETAILS,
  payload
});
