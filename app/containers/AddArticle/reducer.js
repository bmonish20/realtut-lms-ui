/*
 *
 * AddArticle reducer
 *
 */
import produce from "immer";
import {
  CHANGE_TITLE,
  CHANGE_CATEGORY,
  CHANGE_DESCRIPTION,
  SET_DETAILS,
  SET_SUBMITTING,
  TOGGLE_PUBLISH,
  VALIDATION_FAILURE,
  INIT,
  SET_CATEGORY_LIST,
  SET_IMAGE
} from "./constants";

export const initialState = {
  title: '',
  category: '',
  description: '',
  isDraft: true,
  isEdit: false,
  isSubmitting: false,
  validationError: null,
  categoryList: [],
  imgUrl: null,
  imgData: null
};

/* eslint-disable default-case, no-param-reassign */
const addArticleReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case TOGGLE_PUBLISH:
        draft.isDraft = !state.isDraft;
        break;
      case CHANGE_CATEGORY:
        draft.category = action.payload;
        break;
      case CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case SET_SUBMITTING: {
        draft.isSubmitting = action.payload;
        // draft.validationError = null;
        break;
      }
      case SET_DETAILS: {
        const {
          title,
          isDraft,
          category,
          description,
          pictureUrl
        } = action.payload;
        draft.title = title;
        draft.isDraft = isDraft;
        draft.category = category;
        draft.description = description;
        draft.isEdit = true;
        draft.imgUrl = pictureUrl;
        break;
      }
      case VALIDATION_FAILURE:
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message
        };
        break;
      case SET_CATEGORY_LIST:
        draft.categoryList = action.payload.map(each => ({ value: each, label: each }));
        break;
      case SET_IMAGE: {
        draft.imgUrl = URL.createObjectURL(action.payload);
        draft.imgData = action.payload;
        break;
      }
    }
  });

export default addArticleReducer;
