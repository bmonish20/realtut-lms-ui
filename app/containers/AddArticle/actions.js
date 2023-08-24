/*
 *
 * AddArticle actions
 *
 */
import _get from "lodash/get";
import {
  INIT,
  CHANGE_TITLE,
  CHANGE_CATEGORY,
  CHANGE_DESCRIPTION,
  SET_DETAILS,
  SET_SUBMITTING,
  TOGGLE_PUBLISH,
  VALIDATION_FAILURE,
  SET_CATEGORY_LIST,
  SET_IMAGE,
  PROFILE_PICTURE_MAX_SIZE
} from "./constants";
import NotificationHandler from "components/Notifications/NotificationHandler";
import history from "utils/history";
import { addArticle, editArticle, getCategories, uploadFileApi } from "./addArticleApi";
import { fetchArticleDetails } from "../Article/articleApi";
import schema from "./validations";

export const onCreate = (article, image) => {
  return async dispatch => {
    try {
      const isValid = schema.isValidSync(article);
      if(!isValid) {
        const err = await schema.validate(article).catch((err) => err);
        dispatch(validationError(err));
        return;
      }
      dispatch(setIsSubmitting(true));
      const { data: { id } } = await addArticle(article);
      try {
        if(image) {
          let formData = new FormData();
          formData.append("file", image);
          const { data } = await uploadFileApi(id, formData);
        }
        NotificationHandler.open({
          operation: "success",
          title: "Article added successfully",
        });
      }
      catch(err) {
        NotificationHandler.open({
          operation: "warning",
          message:
            _get(err, "response.data", null) ||
            "Something went wrong. Please try again later",
          title: "Article created. But unable to upload image",
        });
      }
      history.push("/resources");
    }
    catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add Article",
      });
    }
    finally {
      dispatch(setIsSubmitting(false));
    }
  }
}

export const onEdit = (id, article, image) => {
  return async dispatch => {
    try {
      const isValid = schema.isValidSync(article);
      if(!isValid) {
        const err = await schema.validate(article).catch((err) => err);
        dispatch(validationError(err));
        return;
      }
      dispatch(setIsSubmitting(true));
      await editArticle(id, article);

      try {
        if(image) {
          let formData = new FormData();
          formData.append("file", image);
          const { data } = await uploadFileApi(id, formData);
        }
        NotificationHandler.open({
          operation: "success",
          title: "Article updated successfully",
        });
      }
      catch(err) {
        NotificationHandler.open({
          operation: "warning",
          message:
            _get(err, "response.data", null) ||
            "Something went wrong. Please try again later",
          title: "Article updated. But unable to upload image",
        });
      }
      history.push("/resources");
    }
    catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update Article",
      });
    }
    finally {
      dispatch(setIsSubmitting(false));
    }
  }
}

export const fetchArticle = (id) => {
  return async dispatch => {
    try {
      const { data } = await fetchArticleDetails(id);
      dispatch(setDetails(data));
    }
    catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch course details",
      });
    }
  }
}

export const fetchCategoryList = () => {
  return async dispatch => {
    try {
      const { data } = await getCategories();
      dispatch(setCategoryList(data));
    }
    catch (err) {
      dispatch(setCategoryList([]));
    }
  }
}

export const uploadImage = file => {
  return dispatch => {
    if(file.size < PROFILE_PICTURE_MAX_SIZE) {
      dispatch(setImage(file));
    }
    else {
      NotificationHandler.open({
        operation: "failure",
        message: "File size too large",
        title: "Cannot Upload Picture",
      });
    }
  }
}

export const addArticleInit = () => ({
  type: INIT
});

export const changeTitle = (payload) => ({
  type: CHANGE_TITLE,
  payload
});

export const changeCategory = (payload) => ({
  type: CHANGE_CATEGORY,
  payload
});

export const changeDescription = (payload) => ({
  type: CHANGE_DESCRIPTION,
  payload
});

export const togglePublish = () => ({
  type: TOGGLE_PUBLISH,
});

export const setIsSubmitting = (payload) => ({
  type: SET_SUBMITTING,
  payload
});

const validationError = (payload) => ({
  type: VALIDATION_FAILURE,
  payload
});

const setDetails = payload => ({
  type: SET_DETAILS,
  payload
});

const setCategoryList = payload => ({
  type: SET_CATEGORY_LIST,
  payload
});

const setImage = payload => ({
  type: SET_IMAGE,
  payload
});


