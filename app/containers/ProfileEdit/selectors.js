import _get from "lodash/get";

const initCollegeInfo = {
  graduationDate: "",
  university: "",
  major: "",
  degree: "",
  gpa: "",
  max: "",
};

const initCompanyInfo = {
  companyName: "",
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  currentWorking: false,
};

const initOtherProfile = {
  websiteUrl: "",
  linkedInLink: "",
  githubLink: "",
  twitterLink: ""
}

export const loggedUserId = (cookie) => _get(cookie, "user.id", "User");
export const loggedUserEmail = (cookie) => _get(cookie, "user.email", "email");
export const pictureFromCookie = (cookie) => _get(cookie,"user.picture","");
export const firstName = (state) =>
  _get(state, "firstName", "");

export const lastName = (state) => _get(state, "lastName", "");

export const email = (state) => _get(state, "email", "");

export const phoneNumber = (state) =>
  _get(state, "phoneNumber", "");

export const currentRole = (state) => _get(state, "currentRole", "");

export const userName = (state) => _get(state, "userName", "");

export const currentCompanyName = (state) =>
  _get(state, "currentCompanyName", "");

export const experience = (state) => {
  return _get(state, "experience", '');
};

export const bio = (state) => _get(state, "bio", "");
export const openToRoles = (state) =>
  _get(state, "openToRoles", []);
export const websiteUrl = (state) =>
  _get(state, "websiteUrl", "");
export const linkedInLink = (state) =>
  _get(state, "linkedInLink", "");
export const githubLink = (state) =>
  _get(state, "githubLink", "");
export const twitterLink = (state) =>
  _get(state, "twitterLink", "");
export const isLoading = (state) =>
  _get(state, "isLoading", false);
export const imageUrl = (state) =>
  _get(state, "imageUrl", "../../assets/img/brand/favicon.png");
export const collegeInfo = (state) =>
  _get(state, "collegeInfo", initCollegeInfo);
export const companyInfo = (state) =>
  _get(state, "companyInfo", initCompanyInfo);
export const skills = (state) => _get(state, "skills", []);
export const achievements = (state) =>
  _get(state, "achievements", "");
export const errorMessage = (state) =>
  _get(state, "errorMessage", null);
export const validations = (state) => 
_get(state, "validationError", null)
export const otherProfile = state => 
_get(state,'otherProfile',initOtherProfile)

export const isUploadImageSuccess = state =>
 _get(state,"isUploadImageSuccess",false)

export const availableRoles = state => {   
   return _get(state,'availableRoles',[])
} 
export const availableSkills = state => _get(state,'availableSkills',[])
export const profilePicture = state => _get(state,'profilePicture','')

export const ProfileStateSelector = (state) =>  ({
    firstName: firstName(state),
    lastName: lastName(state),
    email: email(state),
    phoneNumber: phoneNumber(state),
    userName: userName(state),
    currentRole: currentRole(state),
    experience: experience(state),
    currentCompanyName: currentCompanyName(state),
    bio: bio(state),
    openToRoles: openToRoles(state),
    otherProfile: otherProfile(state),
    imageUrl: imageUrl(state),
    collegeInfo: collegeInfo(state),
    companyInfo: companyInfo(state),
    skills: skills(state),
    achievements: achievements(state),
    isLoading: isLoading(state),
    errorMessage: errorMessage(state),
    validationError: validations(state),
    isUploadImageSuccess: isUploadImageSuccess(state),
  });


export const AppDataSelector = (state) => ({
  availableRoles:  availableRoles(state),
  availableSkills: availableSkills(state),
  profilePicture: profilePicture(state),
});
