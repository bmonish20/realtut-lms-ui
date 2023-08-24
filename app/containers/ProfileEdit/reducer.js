import produce from "immer";
import _get from "lodash/get";
import {
  PROFILE_EDIT_PAGE_INIT,
  PROFILE_EDIT_PAGE_UPLOAD_IMAGE_SUCCESS,
  PROFILE_EDIT_PAGE_UPLOAD_IMAGE_FAILED,
  PROFILE_EDIT_VALIDATION_ERROR,
  PROFILE_EDIT_PAGE_LOADING,
  FETCH_PROFILE_DETAILS_SUCCESS,
  FETCH_PROFILE_DETAILS_FAILED,
  UPDATE_PROFILE_DETAILS_SUCCESS,
  UPDATE_PROFILE_DETAILS_FAILED,
  UPDATE_PROFILE_DETAILS,
  PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_FAILED,
  PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_SUCCESS,
  PROFILE_EDIT_PAGE_RESET,
} from "./constants";

const initialState = {
  imageUrl: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  userName: "",
  currentRole: "",
  currentCompanyName: "",
  experience: "",
  bio: "",
  openToRoles: [],
  otherProfile: {
    websiteUrl: "",
    linkedInLink: "",
    twitterLink: "",
    githubLink: "",
  },
  collegeInfo: {
    graduationDate: "",
    university: "",
    major: "",
    degree: "",
    gpa: "",
    max: "",
  },
  companyInfo: {
    companyName: "",
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    currentWorking: false
  },
  skills: [],
  achievements: "",
  isLoading: false,
  errorMessage: null,
  validationError: null,
  isUploadImageSuccess: false
};

const getErrorMessage = (err) =>
  _get(err, "response.data", null) ||
  "Something went wrong. Please try again later";

const ProfileEditPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PROFILE_EDIT_PAGE_INIT:
      case PROFILE_EDIT_PAGE_RESET:
        return initialState;
      case FETCH_PROFILE_DETAILS_SUCCESS:
      case UPDATE_PROFILE_DETAILS_SUCCESS:
      case UPDATE_PROFILE_DETAILS:
        return action.payload;
      case PROFILE_EDIT_PAGE_UPLOAD_IMAGE_SUCCESS:        
        draft.imageUrl = action.payload;
        draft.isUploadImageSuccess = true;
        break;
      case PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_FAILED:
        draft.imageUrl = "";
        break;
      case PROFILE_EDIT_PAGE_DOWNLOAD_IMAGE_SUCCESS:
        draft.imageUrl = action.payload;
        break;
      case PROFILE_EDIT_VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = action.payload
        break;
      case PROFILE_EDIT_PAGE_LOADING:
        draft.isLoading = action.payload
        break;
      case PROFILE_EDIT_PAGE_RESET: 
        draft.isUploadImageSuccess = false;
        break;
      case FETCH_PROFILE_DETAILS_FAILED:
      case UPDATE_PROFILE_DETAILS_FAILED:
      case PROFILE_EDIT_PAGE_UPLOAD_IMAGE_FAILED:
        draft.isUploadImageSuccess = false;
        draft.unexpectedError = action.payload
        break;
    }
  });

export default ProfileEditPageReducer;
