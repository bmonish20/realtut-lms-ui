import _get from "lodash/get";

export const loggedUserEmail = (cookie) => _get(cookie, "user.email", "email");

export const isUploadResumeSuccess = state => _get(state,"isUploadResumeSuccess",false)

export const resumeUrl =  state => _get(state,"resumeUrl","");
export const isLoading =  state => _get(state,"isLoading",false);
