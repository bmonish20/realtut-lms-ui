/*
 *
 * Webinar reducer
 *
 */
import produce from "immer";
import _get from "lodash/get";
import { UPDATE_WEBINAR_DETAILS, WEBINAR_DETAILS_INIT, WEBINAR_REGISTRATION_SUCCESS } from "./constants";
import { parseDateTime } from "utils/dateTimeHelpers";
import { getHostedBy, getHostedById, getHostedByPictureUrl } from "./selectors";

export const initialState = {
  isLoading: true,
  title: null,
  type: null,
  dateTime: null,
  date: null,
  time: null,
  hostedById: null,
  hostedBy: null,
  hostedByPictureUrl: null,
  shortDescription: null,
  description: null,
  webinarLink: null,
  registeredCount: 0,
  tags: [],
  isUserRegistered: false,
};

/* eslint-disable default-case, no-param-reassign */
const webinarReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case UPDATE_WEBINAR_DETAILS: {
        const { date, time } = parseDateTime(payload.dateTime);
        draft.isLoading = false;
        draft.title = payload.title;
        draft.type = payload.type;
        draft.dateTime = payload.dateTime;
        draft.date = date;
        draft.time = time;
        draft.hostedById = getHostedById(payload);
        draft.hostedBy = getHostedBy(payload);
        draft.hostedByPictureUrl = getHostedByPictureUrl(payload);
        draft.shortDescription =  payload.shortDescription;
        draft.description = payload.description;
        draft.webinarLink = payload.webinarLink;
        draft.tags = payload.tags;
        draft.registeredCount = payload.registeredUsers;
        draft.isUserRegistered = payload.isUserRegistered;
        break;
      }
      case WEBINAR_DETAILS_INIT: 
        return initialState;
      case WEBINAR_REGISTRATION_SUCCESS:
        draft.isUserRegistered = true; break;
    }
  });

export default webinarReducer;
