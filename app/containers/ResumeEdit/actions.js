/*
 *
 * ResumeEdit actions
 *
 */

import {
  UPLOAD_RESUME_FAILED,
  UPLOAD_RESUME_SUCCESS,
  RESUME_EDIT_LOADING,
  RESET_RESUME_EDIT_STATE,
  RESUME_MAX_SIZE,
} from "./constants";
import { uploadFile } from "./ResumeEditApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import _get from "lodash/get";

export const resumeUploadSuccess = (fileUrl) => ({
  type: UPLOAD_RESUME_SUCCESS,
  payload: fileUrl,
});

export const resetState = () => ({
  type: RESET_RESUME_EDIT_STATE,
});

export const resumeUploadFailed = (err) => ({
  type: UPLOAD_RESUME_FAILED,
  payload: err,
});

export const showLoading = (isLoading) => ({
  type: RESUME_EDIT_LOADING,
  payload: isLoading,
});

export const uploadResume = ({ file, email }) => {
  return async (dispatch) => {
    try {
      if (file.size < RESUME_MAX_SIZE) {
        dispatch(showLoading(true));
        let formData = new FormData();
        formData.append("file", file);
        const response = await uploadFile(formData, email);
        dispatch(resumeUploadSuccess(response.data));
        dispatch(showLoading(false));
      } else {
        NotificationHandler.open({
          operation: "failure",
          message: "File size too large",
          title: "Cannot Upload Resume",
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
      dispatch(resumeUploadFailed(error));
      dispatch(showLoading(false));
    }
  };
};

export const resumeDownloadSuccess = (url) => ({
  type: DOWNLOAD_RESUME_SUCCESS,
  payload: url,
});

export const resumeDownloadFailed = (error) => ({
  type: DOWNLOAD_RESUME_FAILED,
  payload: error,
});

export const downloadResume = (email) => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const response = await downloadFile(email);
      dispatch(resumeDownloadSuccess(response.data));
      dispatch(showLoading(false));
    } catch (error) {
      console.log("Error---", error);
      dispatch(resumeDownloadFailed(error));
      dispatch(showLoading(false));
    }
  };
};
