import {
  ADD_EVENT_PAGE_INIT,
  ADD_EVENT_CHANGE_TITLE,
  ADD_EVENT_CHANGE_DATE,
  ADD_EVENT_CHANGE_PARTICIPANTS,
  ADD_EVENT_CHANGE_SUMMARY,
  ADD_EVENT_CHANGE_DESCRIPTION,
  ADD_EVENT_CHANGE_TAGS,
  ADD_EVENT_CHANGE_LINK,
  ADD_EVENT_CHANGE_TYPE,
  ADD_EVENT_SHOW_LOADING,
  ADD_EVENT_VALIDATION_ERROR,
  SET_EVENT_DETAILS,
  SET_RECURRENCE
} from "./constants";
import _get from "lodash/get";
import history from "../../utils/history";
import schema from "./validations";
import { addEventApi, editEventApi } from "./addEventApi";
import { fetchWebinarDetails } from "../Webinar/webinarApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const onSubmit = (eventDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(eventDetails);
      if (!isValid) {
        const err = await schema.validate(eventDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var tagsArray = [];
      dispatch(showLoading(true));
      eventDetails.tags.map((tag) => {
        tagsArray.push(tag.value);
      });
      await addEventApi({
        ...eventDetails,
        tags: tagsArray,
      });
      NotificationHandler.open({
        operation: "success",
        title: "Event added successfully",
      });
      history.push("/events");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add event",
      });
    }
  };
};

export const editEvent = (id, eventDetails) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(eventDetails);
      if (!isValid) {
        const err = await schema.validate(eventDetails).catch((err) => err);
        dispatch(validationFailed(err));
        return;
      }
      var tagsArray = [];
      dispatch(showLoading(true));
      eventDetails.tags.map((tag) => {
        tagsArray.push(tag.value);
      });
      await editEventApi(id, { ...eventDetails, tags: tagsArray });
      NotificationHandler.open({
        operation: "success",
        title: "Event updated successfully",
      });
      history.push("/events");
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to edit the event",
      });
    }
  };
};

export const fetchDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchWebinarDetails(id);
      dispatch(setEventDetails(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch event details",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: ADD_EVENT_VALIDATION_ERROR,
  payload,
});

const setEventDetails = (payload) => ({
  type: SET_EVENT_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: ADD_EVENT_SHOW_LOADING,
  payload,
});

export const addEventInit = (dispatch) => () => {
  dispatch({
    type: ADD_EVENT_PAGE_INIT,
  });
};

export const changeTitle = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_TITLE,
    payload,
  });
};

export const changeDate = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_DATE,
    payload,
  });
};

export const changeParticipants = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_PARTICIPANTS,
    payload,
  });
};

export const changeSummary = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_SUMMARY,
    payload,
  });
};

export const changeDescription = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_DESCRIPTION,
    payload,
  });
};

export const changeTags = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_TAGS,
    payload,
  });
};

export const changeEventLink = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_LINK,
    payload,
  });
};

export const changeEventType = (dispatch) => (payload) => {
  dispatch({
    type: ADD_EVENT_CHANGE_TYPE,
    payload,
  });
};

export const changeRecurrenceType = (payload) => ({
  type: SET_RECURRENCE,
  payload,
});