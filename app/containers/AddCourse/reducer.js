/*
 *
 * AddCourse reducer
 *
 */
import produce from "immer";
import _filter from "lodash/filter";
import _find from "lodash/find";
import _pullAt from "lodash/pullAt";
import _findIndex from "lodash/findIndex";
import moment from "moment-timezone";
import {
  ADD_COURSE_INIT,
  CHANGE_TITLE,
  CHANGE_TYPE,
  CHANGE_START_DATE,
  CHANGE_SUMMARY,
  CHANGE_DURATION,
  CHANGE_DESCRIPTION,
  CHANGE_PREREQUISETE,
  CHANGE_TAGS,
  SET_SUBMITTING,
  VALIDATION_ERROR,
  SET_DETAILS,
  APPEND_CHAPTER,
  REMOVE_CHAPTER,
  SET_CHAPTERS_DROPDOWN,
  APPEND_QUIZ,
  REMOVE_QUIZ,
  SET_QUIZZES_DROPDOWN,
  EDIT_CHAPTERS,
  SET_IMAGE,
} from "./constants";
import { shapeToDropDown } from "./helpers";

const getTags = (tags = []) => {
  let formattedTags = [];
  tags.map((each) =>
    formattedTags.push({
      value: each,
      label: each,
    })
  );
  return formattedTags;
};

export const initialState = {
  title: "",
  type: "",
  startDate: "",
  duration: "",
  shortDescription: "",
  description: "",
  languages: "",
  prerequisite: "",
  tags: [],
  chapters: [],
  quizzes: [],
  isSubmitting: false,
  validationError: null,
  isEdit: false,
  availableChapters: [],
  availableQuizzes: [],
  imgUrl: null,
  imgData: null,
};

/* eslint-disable default-case, no-param-reassign */
const addCourseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case CHANGE_START_DATE:
        draft.startDate = action.payload;
        break;
      case CHANGE_DURATION:
        draft.duration = action.payload;
        break;
      case CHANGE_SUMMARY:
        draft.shortDescription = action.payload;
        break;
      case CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case CHANGE_PREREQUISETE:
        draft.prerequisite = action.payload;
        break;
      case CHANGE_TAGS:
        draft.tags = action.payload || [];
        break;
      case SET_SUBMITTING: {
        draft.isSubmitting = action.payload;
        draft.validationError = null;
        break;
      }
      case VALIDATION_ERROR:
        draft.validationError = action.payload;
        break;
      case ADD_COURSE_INIT:
        return initialState;
      case APPEND_CHAPTER: {
        draft.chapters.push(action.payload);
        _pullAt(
          draft.availableChapters,
          _findIndex(
            draft.availableChapters,
            (each) => each.value === action.payload.id
          )
        );
        break;
      }
      case REMOVE_CHAPTER: {
        const { index, id: value, title: label } = action.payload;
        draft.chapters.splice(index, 1);
        draft.availableChapters.push({
          value,
          label,
        });
        break;
      }
      case EDIT_CHAPTERS: {
        const { index, id, title } = action.payload;
        draft.chapters[index] = { id, title };
        break;
      }
      case APPEND_QUIZ:
        draft.quizzes.push(action.payload);
        _pullAt(
          draft.availableQuizzes,
          _findIndex(
            draft.availableQuizzes,
            (each) => each.value === action.payload.id
          )
        );
        break;
      case REMOVE_QUIZ:
        const { index, id: value, title: label } = action.payload;
        draft.quizzes.splice(index, 1);
        draft.availableQuizzes.push({ value, label });
        break;
      case SET_DETAILS: {
        draft.title = action.payload.title;
        draft.type = action.payload.type;
        draft.startDate = moment(action.payload.startDate);
        draft.duration = action.payload.duration;
        draft.shortDescription = action.payload.shortDescription;
        draft.description = action.payload.description;
        draft.prerequisite = action.payload.prerequisite;
        draft.chapters = action.payload.chapters;
        draft.quizzes = action.payload.quizzes;
        draft.tags = getTags(action.payload.tags);
        draft.isEdit = true;
        draft.imgUrl = action.payload.pictureUrl;
        draft.availableChapters = _filter(
          draft.availableChapters,
          (each) =>
            !_find(
              action.payload.chapters,
              (chapter) => chapter.id === each.value
            )
        );
        draft.availableQuizzes = _filter(
          draft.availableQuizzes,
          (each) =>
            !_find(action.payload.quizzes, (quiz) => quiz.id === each.value)
        );
        break;
      }
      case SET_CHAPTERS_DROPDOWN: {
        draft.availableChapters = shapeToDropDown(action.payload);
        break;
      }
      case SET_QUIZZES_DROPDOWN: {
        draft.availableQuizzes = shapeToDropDown(action.payload);
        break;
      }
      case SET_IMAGE: {
        draft.imgUrl = URL.createObjectURL(action.payload);
        draft.imgData = action.payload;
        break;
      }
    }
  });

export default addCourseReducer;
