/*
 *
 * ResumeEdit reducer
 *
 */
import produce from "immer";
import { UPLOAD_RESUME_FAILED,UPLOAD_RESUME_SUCCESS,RESUME_EDIT_LOADING, RESET_RESUME_EDIT_STATE } from "./constants";

export const initialState = {
  resumeUrl: "",
  isUploadResumeSuccess: false,
  isLoading: false
};

/* eslint-disable default-case, no-param-reassign */
const resumeEditReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_RESUME_FAILED:
         draft.resumeUrl = "";
        draft.isUploadResumeSuccess = false;
        break;
      case UPLOAD_RESUME_SUCCESS:
        draft.resumeUrl = action.payload;
        draft.isUploadResumeSuccess = true;
        break;
      case RESUME_EDIT_LOADING: 
        draft.isLoading = action.payload
        break;
      case RESET_RESUME_EDIT_STATE:
        return initialState;
    }
  });

export default resumeEditReducer;
