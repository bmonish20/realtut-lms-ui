import produce from "immer";
import _get from "lodash/get";
import moment from "moment-timezone";
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

const initialState = {
  title: "",
  dateTime: "",
  participants: "",
  shortDescription: "",
  description: "",
  tags: "",
  webinarLink: "",
  type: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isEdit: false,
  recurrence: null
};

const getTags = (tags = []) => {
  let formattedTags = [];
  tags.map((tag) =>
    formattedTags.push({
      value: tag,
      label: tag,
    })
  );
  return formattedTags;
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) || "Event not added. Please try again later";

const addEventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_EVENT_DETAILS: {
        draft.title = action.payload.title;
        draft.dateTime = moment(action.payload.dateTime);
        draft.participants = action.payload.participants;
        draft.shortDescription = action.payload.shortDescription;
        draft.description = action.payload.description;
        draft.tags = getTags(action.payload.tags);
        draft.webinarLink = action.payload.webinarLink;
        draft.type = action.payload.type;
        draft.isEdit = true;
        break;
      }
      case ADD_EVENT_PAGE_INIT:
        return initialState;
      case ADD_EVENT_CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case ADD_EVENT_CHANGE_DATE:
        draft.dateTime = action.payload;
        break;
      case ADD_EVENT_CHANGE_PARTICIPANTS:
        draft.participants = action.payload;
        break;
      case ADD_EVENT_CHANGE_SUMMARY:
        draft.shortDescription = action.payload;
        break;
      case ADD_EVENT_CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case ADD_EVENT_CHANGE_TAGS:
        draft.tags = action.payload;
        break;
      case ADD_EVENT_CHANGE_LINK:
        draft.webinarLink = action.payload;
        break;
      case ADD_EVENT_CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case ADD_EVENT_SHOW_LOADING: {
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      }
      case ADD_EVENT_VALIDATION_ERROR: {
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
      }
      case SET_RECURRENCE:
        draft.recurrence = { type: action.payload };
        break;
    }
  });

export default addEventReducer;
