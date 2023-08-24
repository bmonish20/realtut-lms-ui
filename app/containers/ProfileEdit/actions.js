import map from "lodash/map";
import {
  PROFILE_EDIT_PAGE_INIT,
  PROFILE_EDIT_PAGE_UPLOAD_IMAGE_SUCCESS,
  PROFILE_EDIT_PAGE_UPLOAD_IMAGE_FAILED,
  PROFILE_EDIT_VALIDATION_ERROR,
  PROFILE_EDIT_PAGE_LOADING,
  UPDATE_PROFILE_DETAILS_FAILED,
  UPDATE_PROFILE_DETAILS_SUCCESS,
  UPDATE_PROFILE_DETAILS,
  FETCH_PROFILE_DETAILS_FAILED,
  FETCH_PROFILE_DETAILS_SUCCESS,
  PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_SUCCESS,
  PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_FAILED,
  PROFILE_PICTURE_MAX_SIZE,
  PROFILE_EDIT_PAGE_RESET,
} from "./constants";
import * as dashboardActions from "../Dashboard/actions";
import * as appActions from "../App/actions";
import {
  uploadFile,
  FetchUserDetails,
  UpdateUserDetails,
  downloadFile,
  GetRoles,
  GetSkills,
} from "./ProfileEditApi";
import schema from "./validation";
import _get from "lodash/get";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const profileEditPageInit = (dispatch) => () => {
  dispatch({
    type: PROFILE_EDIT_PAGE_INIT,
  });
};

export const profileEditPageReset = () => ({
  type: PROFILE_EDIT_PAGE_RESET,
});

export const profileUploadSuccess = (imageUrl) => ({
  type: PROFILE_EDIT_PAGE_UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const profileUploadFailed = (err) => ({
  type: PROFILE_EDIT_PAGE_UPLOAD_IMAGE_FAILED,
  payload: err,
});

export const showLoading = (isLoading) => ({
  type: PROFILE_EDIT_PAGE_LOADING,
  payload: isLoading,
});

export const uploadProfilePicture = ({ file, email }) => {
  return async (dispatch) => {
    try {
      if (file.size < PROFILE_PICTURE_MAX_SIZE) {
        dispatch(showLoading(true));
        let formData = new FormData();
        formData.append("file", file);
        const response = await uploadFile(formData, email);
        dispatch(profileUploadSuccess(response.data));
        dispatch(dashboardActions.profileDownloadSuccess(response.data));
        dispatch(appActions.profileDownloadSuccess(response.data));
        dispatch(showLoading(false));
      } else {
        NotificationHandler.open({
          operation: "failure",
          message: "File size too large",
          title: "Cannot Upload Picture",
        });
      }
    } catch (error) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(error, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update profile picture",
      });
      console.log("Error---", error);
      dispatch(profileUploadFailed(error));
      dispatch(dashboardActions.profileDownloadFailed(error));
      dispatch(showLoading(false));
    }
  };
};

export const profileDownloadSuccess = (imageUrl) => ({
  type: PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const profileDownloadFailed = (imageUrl) => ({
  type: PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_FAILED,
  payload: imageUrl,
});

export const downloadProfilePicture = (email) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const response = await downloadFile(email);
      dispatch(profileDownloadSuccess(response.data));
      dispatch(showLoading(false));
    } catch (error) {
      console.log("Error---", error);
      dispatch(profileDownloadFailed(error));
      dispatch(showLoading(false));
    }
  };
};

const fetchUserDetailsSuccess = (data) => ({
  type: FETCH_PROFILE_DETAILS_SUCCESS,
  payload: data,
});

const fetchUserDetailsFailed = (error) => ({
  type: FETCH_PROFILE_DETAILS_FAILED,
  payload: error,
});

export const FetchProfileDetails = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const response = await FetchUserDetails(userId);
      dispatch(fetchUserDetailsSuccess(response.data));
      dispatch(showLoading(false));
    } catch (error) {
      console.log("Error---", error);
      dispatch(fetchUserDetailsFailed(error));
      dispatch(showLoading(false));
    }
  };
};

const updateUserDetailsSuccess = (data) => ({
  type: UPDATE_PROFILE_DETAILS_SUCCESS,
  payload: data,
});

const updateUserDetailsFailed = (error) => ({
  type: UPDATE_PROFILE_DETAILS_FAILED,
  payload: error,
});

export const UpdateProfileDetails = (payload) => ({
  type: UPDATE_PROFILE_DETAILS,
  payload,
});

const validationFailed = (payload) => {
  return {
    type: PROFILE_EDIT_VALIDATION_ERROR,
    payload,
  };
};

export const onSubmit = (userDetails) => {
  return async (dispatch) => {
    dispatch(UpdateProfileDetails(userDetails));
    try {
      const isValid = schema.isValidSync(userDetails);
      if (!isValid) {
        const err = await schema
          .validate(userDetails, { abortEarly: false })
          .catch((errors) => {
            return map(errors.inner, (error) => {
              return {
                message: error.errors[0],
                path: error.path,
              };
            });
          });
        dispatch(validationFailed(err));
        return;
      }
      dispatch(showLoading(true));

      const response = await UpdateUserDetails(userDetails.userId, userDetails);
      dispatch(updateUserDetailsSuccess(response.data));
      NotificationHandler.open({
        operation: "success",
        title: "Profile Updated successfully",
      });
      dispatch(showLoading(false));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update your profile",
      });
      console.log("Error---", error);
      dispatch(updateUserDetailsFailed(error));
      dispatch(showLoading(false));
    }
  };
};
