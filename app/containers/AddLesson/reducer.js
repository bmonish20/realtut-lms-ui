/*
 *
 * AddLesson reducer
 *
 */
import produce from "immer";
import {
  INIT,
  CHANGE_TITLE,
  CHANGE_TYPE,
  CHANGE_LEVEL,
  CHANGE_LINK,
  CHANGE_DATE,
  CHANGE_TAG,
  CHANGE_VIDEO_LINK,
  SET_SUBMITTING,
  VALIDATION_ERROR,
  SET_LESSON_DETAILS,
  SET_RECURRENCE,
} from "./constants";

export const initialState = {
  title: "",
  type: null,
  level: null,
  link: "",
  dateTime: "",
  tags: [],
  videoLink: "",
  validations: null,
  isSubmitting: false,
  isEdit: false,
  recurrence: null,
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

/* eslint-disable default-case, no-param-reassign */
const addLessonReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case CHANGE_DATE:
        draft.dateTime = action.payload;
        break;
      case CHANGE_LEVEL:
        draft.level = action.payload;
        break;
      case CHANGE_LINK:
        draft.link = action.payload;
        break;
      case CHANGE_TAG:
        draft.tags = action.payload || [];
        break;
      case CHANGE_VIDEO_LINK:
        draft.videoLink = action.payload;
        break;
      case SET_SUBMITTING:
        draft.isSubmitting = action.payload;
        break;
      case VALIDATION_ERROR:
        draft.validations = action.payload;
        break;
      case SET_LESSON_DETAILS: {
        draft.title = action.payload.title;
        draft.type = {
          value: action.payload.type,
          label: action.payload.type,
        };
        draft.level = {
          value: action.payload.level,
          label: action.payload.level,
        };
        draft.tags = getTags(action.payload.tags);
        draft.link = action.payload.link;
        draft.videoLink = action.payload.videoLink;
        draft.isEdit = true;
        break;
      }
      case SET_RECURRENCE:
        draft.recurrence = { type: action.payload };
        break;
    }
  });

export default addLessonReducer;
