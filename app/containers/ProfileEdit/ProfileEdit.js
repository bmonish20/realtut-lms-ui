import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import { useCookies } from "react-cookie";
import useDeepCompareEffect from "use-deep-compare-effect";
import get from "lodash/get";
import {
  Container,
  Row,
  Label,
  Col,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import NotificationAlert from "react-notification-alert";
import CreatableSelect from "react-select/creatable";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput";
import RtUploadFile from "../../components/RtUploadFile";
import ProfileLoading from "../../components/ProfileLoading";
import { parseDate } from "../../utils/dateTimeHelpers";
import "./ProfileEditStyle.scss";
import UploadFileLoading from "../../components/UploadFileLoading";
import { initialState } from "../Dashboard/reducer";
import isEmpty from "lodash/isEmpty";
function ProfileEdit() {
  useInjectReducer({ key: "profileEditPage", reducer });
  const [cookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const userId = selectors.loggedUserId(cookie);
  const loggedUserEmail = selectors.loggedUserEmail(cookie);
  const pictureFromCookie = (cookie) => _get(cookie, "user.picture", null);

  const profileDetails = useSelector((state) =>
    selectors.ProfileStateSelector(get(state, "profileEditPage", {}))
  );
  const appData = useSelector((state) =>
    selectors.AppDataSelector(get(state, "global", {}))
  );
  const dashboard = useSelector((state) =>
    get(state, "dashboard", { ...initialState })
  );

  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [email, changeEmail] = useState("");
  const [phoneNumber, changePhonenumber] = useState("");
  const [userName, changeUserName] = useState("");
  const [currentRole, changeRole] = useState("");
  const [currentCompanyName, changeCurrentCompanyName] = useState("");
  const [experience, changeExperience] = useState("");
  const [bio, changeBio] = useState("");
  const [skills, changeSkills] = useState([]);
  const [otherProfile, changeOtherProfile] = useState({});
  const [openToRoles, changeOpenToRoles] = useState([]);
  const [companyInfo, changeCompanyInfo] = useState({});
  const [collegeInfo, changeCollegeInfo] = useState({});
  const [achievements, changeAchievements] = useState("");
  const [isLoading, changeLoader] = useState(false);
  const [imageUrl, changeImageUrl] = useState("");
  const [validationError, changeValidations] = useState({});
  const [errorMessage, changeError] = useState("");
  const [availableRoles, changeAvilableRoles] = useState([]);
  const [availableSKills, changeAvailableSkills] = useState([]);
  const [isUploadImageSuccess, changeUploadImageSuccess] = useState(false);
  const profileEditPageInit = operations.profileEditPageInit(dispatch);

  useEffect(() => {
    dispatch(operations.FetchProfileDetails(userId));
  }, []);

  useDeepCompareEffect(() => {
    changeAvilableRoles(selectors.availableRoles(appData));
    changeAvailableSkills(selectors.availableSkills(appData));
  }, [appData]);

  const uploadFile = (e) => {
    dispatch(
      operations.uploadProfilePicture({ file: e, email: loggedUserEmail })
    );
  };
  const constructMultiSelect = (data) => {
    if (data == undefined) return [];

    return data.map((obj, index) => ({
      label: obj,
      value: obj,
      key: index,
    }));
  };
  const destructMultiSelect = (data) => {
    if (data == undefined) return [];
    return data.map((o) => o.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        firstName,
        lastName,
        email,
        phoneNumber,
        userName,
        currentRole,
        experience,
        currentCompanyName,
        bio,
        openToRoles: destructMultiSelect(openToRoles),
        otherProfile,
        companyInfo,
        collegeInfo,
        skills: destructMultiSelect(skills),
        achievements,
        imageUrl,
        userId,
      })
    );
  };

  const setOtherProfile = (key, data) => {
    const otherProfileObj = otherProfile;
    otherProfileObj[key] = data;
    changeOtherProfile({ ...otherProfileObj });
  };

  const setCompanyInfo = (key, data) => {
    const companyInfoObj = companyInfo;
    companyInfoObj[key] = data;
    changeCompanyInfo({ ...companyInfoObj });
  };

  const setCollegeInfo = (key, data) => {
    const collegeInfoObj = collegeInfo;
    collegeInfoObj[key] = data;
    changeCollegeInfo({ ...collegeInfoObj });
  };

  useDeepCompareEffect(() => {
    changeFirstName(selectors.firstName(profileDetails));
    changeLastName(selectors.lastName(profileDetails));
    changeEmail(selectors.email(profileDetails));
    changeUserName(selectors.userName(profileDetails));
    changePhonenumber(selectors.phoneNumber(profileDetails));
    changeRole(selectors.currentRole(profileDetails));
    changeCurrentCompanyName(selectors.currentCompanyName(profileDetails));
    changeExperience(selectors.experience(profileDetails));
    changeBio(selectors.bio(profileDetails));
    changeSkills(constructMultiSelect(selectors.skills(profileDetails)));
    changeOtherProfile(selectors.otherProfile(profileDetails));
    changeOpenToRoles(
      constructMultiSelect(selectors.openToRoles(profileDetails))
    );
    changeCompanyInfo(selectors.companyInfo(profileDetails));
    changeCollegeInfo(selectors.collegeInfo(profileDetails));
    changeAchievements(selectors.achievements(profileDetails));
    changeImageUrl(selectors.imageUrl(profileDetails));
    changeLoader(selectors.isLoading(profileDetails));
    changeValidations(selectors.validations(profileDetails));
    changeError(selectors.errorMessage(profileDetails));
    changeUploadImageSuccess(selectors.isUploadImageSuccess(profileDetails));
  }, [profileDetails]);

  const GetButtonActionComponent = () => {
    return (
      <Row className="mb-6 pl-3 mt-3">
        <Button type="submit" color="primary">
          Submit
        </Button>
        {
          //Yet to be implemented
        }
        <Button type="button" color="secondary" onClick={(e) => console.log()}>
          Cancel
        </Button>
      </Row>
    );
  };

  const getProfileDetailComponent = () => {
    return (
      <Col>
        <Form
          role="form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Row>
            <Col>
              <FormGroup value={firstName}>
                <RtInput
                  type="text"
                  name="firstName"
                  onChange={changeFirstName}
                  placeholder="First Name"
                  error={validationError}
                  value={firstName}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup value={lastName}>
                <RtInput
                  type="text"
                  name="lastName"
                  onChange={changeLastName}
                  placeholder="Last Name"
                  error={validationError}
                  value={lastName}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup value={email}>
                <RtInput
                  type="email"
                  name="email"
                  onChange={changeEmail}
                  placeholder="Email Address"
                  error={validationError}
                  value={email}
                />
              </FormGroup>
            </Col>
            <Col className="">
              <FormGroup value={phoneNumber}>
                <RtInput
                  type="text"
                  name="phoneNumber"
                  onChange={changePhonenumber}
                  placeholder="Phone number"
                  error={validationError}
                  value={phoneNumber}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup value={userName}>
                <RtInput
                  type="text"
                  name="userName"
                  onChange={changeUserName}
                  placeholder="User Name"
                  error={validationError}
                  value={userName}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup value={currentRole}>
                <RtInput
                  type="text"
                  name="currentRole"
                  onChange={changeRole}
                  placeholder="Current Role"
                  error={validationError}
                  value={currentRole}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup value={currentCompanyName}>
                <RtInput
                  type="text"
                  name="currentCompanyName"
                  onChange={changeCurrentCompanyName}
                  placeholder="Company Name"
                  error={validationError}
                  value={currentCompanyName}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup value={experience}>
                <RtInput
                  type="text"
                  name="experience"
                  onChange={changeExperience}
                  placeholder="Years of experience"
                  error={validationError}
                  value={experience}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup value={bio}>
                <Label className="">Your bio</Label>
                <RtInput
                  type="textarea"
                  name="bio"
                  onChange={changeBio}
                  placeholder="Write about yourself"
                  error={validationError}
                  value={bio}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="bo-b-grey">
            <Col>
              <FormGroup value={openToRoles}>
                <Label>Open to the following roles</Label>
                <CreatableSelect
                  closeMenuOnSelect={false}
                  options={availableRoles}
                  value={openToRoles}
                  isMulti
                  placeholder="Select Role"
                  onChange={(e) => {
                    changeOpenToRoles(e);
                  }}
                  allowCreateWhileLoading={false}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="display-grid mt-3 bo-b-grey">
            <Col className="mb-3">
              <Label>Where can we find you online?</Label>
            </Col>
            <Col>
              <Row>
                <Col>
                  <FormGroup value={otherProfile.websiteUrl}>
                    <RtInput
                      type="text"
                      name="otherProfile.websiteUrl"
                      onChange={(e) => setOtherProfile("websiteUrl", e)}
                      placeholder="Website Url"
                      error={validationError}
                      value={otherProfile.websiteUrl}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={otherProfile.linkedInLink}>
                    <RtInput
                      type="text"
                      name="otherProfile.linkedInLink"
                      onChange={(e) => setOtherProfile("linkedInLink", e)}
                      placeholder="Linkedin  Profile Link"
                      error={validationError}
                      value={otherProfile.linkedInLink}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup value={otherProfile.githubLink}>
                    <RtInput
                      type="text"
                      name="otherProfile.githubLink"
                      onChange={(e) => setOtherProfile("githubLink", e)}
                      placeholder="Github Link"
                      error={validationError}
                      value={otherProfile.githubLink}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={otherProfile.twitterLink}>
                    <RtInput
                      type="text"
                      name="otherProfile.twitterLink"
                      onChange={(e) => setOtherProfile("twitterLink", e)}
                      placeholder="Twitter"
                      error={validationError}
                      value={otherProfile.twitterLink}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="display-grid bo-b-grey mt-3">
            <Col className="mb-3">
              <Label>Your work experience</Label>
            </Col>
            <Col>
              <Row>
                <Col>
                  <FormGroup value={companyInfo.companyName}>
                    <RtInput
                      type="text"
                      name="company"
                      onChange={(e) => setCompanyInfo("companyName", e)}
                      placeholder="Company"
                      error={validationError}
                      value={companyInfo.companyName}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={companyInfo.title}>
                    <RtInput
                      type="text"
                      name="jobTitle"
                      onChange={(e) => setCompanyInfo("title", e)}
                      placeholder="Title"
                      error={validationError}
                      value={companyInfo.title}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup value={companyInfo.startDate}>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Start Date",
                        }}
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        onChange={(e) =>
                          setCompanyInfo("startDate", parseDate(e))
                        }
                        value={companyInfo.startDate}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={companyInfo.endDate}>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "End Date",
                          disabled: companyInfo.currentWorking,
                        }}
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        onChange={(e) =>
                          setCompanyInfo("endDate", parseDate(e))
                        }
                        value={companyInfo.endDate}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className="ml-4">
                  <FormGroup value={companyInfo.currentWorking}>
                    <Label>
                      <Input
                        type="checkbox"
                        name="currentWorking"
                        onChange={(e) =>
                          setCompanyInfo("currentWorking", e.target.checked)
                        }
                        checked={companyInfo.currentWorking}
                      />
                      I currently work here
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="">
                <Col>
                  <FormGroup value={companyInfo.description}>
                    <Label>Description</Label>
                    <RtInput
                      type="textarea"
                      name="jobDesc"
                      onChange={(e) => setCompanyInfo("description", e)}
                      error={validationError}
                      value={companyInfo.description}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="display-grid mt-3 bo-b-grey">
            <Col>
              <Label>Education</Label>
            </Col>
            <Col className="mb-3">
              <Row className="">
                <Col className="">
                  <FormGroup value={collegeInfo.university}>
                    <RtInput
                      type="text"
                      name="university"
                      onChange={(e) => setCollegeInfo("university", e)}
                      placeholder="College/University"
                      error={validationError}
                      value={collegeInfo.university}
                    />
                  </FormGroup>
                </Col>
                <Col className="">
                  <FormGroup value={collegeInfo.graduationDate}>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Graduation Date",
                        }}
                        dateFormat="DD/MM/YYYY"
                        timeFormat={false}
                        onChange={(e) =>
                          setCollegeInfo("graduationDate", parseDate(e))
                        }
                        value={collegeInfo.graduationDate}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col className="mb-3">
              <Row className="">
                <Col>
                  <FormGroup value={collegeInfo.degree}>
                    <RtInput
                      type="text"
                      name="degree"
                      onChange={(e) => setCollegeInfo("degree", e)}
                      placeholder="Degree"
                      error={validationError}
                      value={collegeInfo.degree}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={collegeInfo.major}>
                    <RtInput
                      type="text"
                      name="major"
                      onChange={(e) => setCollegeInfo("major", e)}
                      placeholder="Major"
                      error={validationError}
                      value={collegeInfo.major}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col className="">
              <Row className="">
                <Col>
                  <FormGroup value={collegeInfo.gpa}>
                    <RtInput
                      onChange={(e) => setCollegeInfo("gpa", e)}
                      type="text"
                      placeholder="GPA"
                      error={validationError}
                      name="gpa"
                      value={collegeInfo.gpa}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup value={collegeInfo.max}>
                    <RtInput
                      onChange={(e) => setCollegeInfo("max", e)}
                      type="text"
                      placeholder="Max"
                      error={validationError}
                      name="max"
                      value={collegeInfo.max}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="display-grid mt-3 bo-b-grey">
            <Col>
              <FormGroup value={skills}>
                <Label>Your Skills</Label>
                <CreatableSelect
                  closeMenuOnSelect={false}
                  options={availableSKills}
                  value={skills}
                  isMulti
                  placeholder="e.g Python, React"
                  onChange={(e) => changeSkills(e)}
                  allowCreateWhileLoading={false}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="display-grid mt-3">
            <Col>
              <FormGroup value={achievements}>
                <Label className="">Achievements</Label>
                <RtInput
                  type="textarea"
                  name="achievements"
                  onChange={changeAchievements}
                  placeholder=""
                  error={validationError}
                  value={achievements}
                />
              </FormGroup>
            </Col>
          </Row>
          {GetButtonActionComponent()}
        </Form>
      </Col>
    );
  };
  var options = {};
  options = {
    place: "br",
    message: (
      <div className="alert-text">
        <span className="alert-title" data-notify="title">
          {" "}
          Profile uploaded successfully!
        </span>
      </div>
    ),
    type: "success",
    autoDismiss: 7,
  };
  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };
  const notificationAlertRef = useRef(null);

  useEffect(() => {
    if (isUploadImageSuccess) {
      notificationAlertRef.current.notificationAlert(options);
    }
  }, [isUploadImageSuccess]);

  useEffect(() => {
    return function cleanup() {
      dispatch(operations.profileEditPageReset());
    };
  }, []);

    const getProfileUrl =  () => {
        if(isEmpty(dashboard.profilePicture)){                    
            if(isEmpty(appData.profilePicture)){
              if(isEmpty(pictureFromCookie)){
                    return "";
                }
                return pictureFromCookie
            }
            return appData.profilePicture;
        }
        return dashboard.profilePicture;
     }

  return (
    <>
      <Container className="profileEdit mt-5">
        <div className="rna-wrapper">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          {isLoading ? (
            <UploadFileLoading />
          ) : (
            <Col md="3" className="">
              <Row className="profile-img">
                <Col className="">
                  {getProfileUrl() ? (
                    <a
                      className=" avatar avatar-lg rounded-circle"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img alt="..." src={getProfileUrl()} />
                    </a>
                  ) : (
                    <i className="ni ni-circle-08 text-primary text-lg pt-2" />
                  )}
                </Col>
                <Col>
                  <RtUploadFile
                    name="profile-img"
                    onChange={uploadFile}
                    labelText="Upload a new photo"
                    value=""
                    className=""
                  />
                </Col>
              </Row>
            </Col>
          )}
          {isLoading ? <ProfileLoading /> : getProfileDetailComponent()}
        </Row>
        {getErrorComponent()}
      </Container>
    </>
  );
}

export default React.memo(ProfileEdit);
