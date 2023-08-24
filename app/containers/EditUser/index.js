import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Form, FormGroup, Label, Button, Spinner } from "reactstrap";
import Select2 from "react-select2-wrapper";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";

function EditUser() {
  useInjectReducer({ key: "editUser", reducer });
  const dispatch = useDispatch();
  const changeFirstName = operations.changeFirstName(dispatch);
  const changeLastName = operations.changeLastName(dispatch);
  const changeEmail = operations.changeEmail(dispatch);
  const changePhoneNumber = operations.changePhoneNumber(dispatch);
  const changeRole = operations.changeRole(dispatch);
  const editUserInit = operations.editUserInit(dispatch);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    enabled,
    isLoading,
    validations,
  } = useSelector((state) => ({
    firstName: selectors.firstName(state),
    lastName: selectors.lastName(state),
    email: selectors.email(state),
    phoneNumber: selectors.phoneNumber(state),
    role: selectors.role(state),
    enabled: selectors.enabled(state),
    isLoading: selectors.isLoading(state),
    validations: selectors.validations(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => editUserInit();
  }, []);

  let userRoleRef = React.useRef(null);

  const onRoleSelect = () => {
    if (userRoleRef.el != undefined) {
      changeRole(userRoleRef.el.val());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const id = qs.parse(location.search).id;
    dispatch(
      operations.onSubmit(id, {
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
      })
    );
  };

  const onDisable = (e) => {
    const id = qs.parse(location.search).id;
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.disableUser(id, { enabled: false })),
      confirmBtnText: "Disable",
      text: `You are about to disable "${firstName} ${lastName}". Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onEnable = (e) => {
    const id = qs.parse(location.search).id;
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.disableUser(id, { enabled: true })),
      confirmBtnText: "Enable",
      text: `You are about to enable "${firstName} ${lastName}". Do you want to continue?`,
      data: {},
      success: true,
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "success",
      cancelBtnBsStyle: "outline-sucess",
    });
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button
          type="button"
          color="primary"
          className="btn-icon"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">Update User</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Update User
      </Button>
    );
  };

  const getDisableButton = () => {
    if (isLoading)
      return (
        <Button
          type="button"
          color="danger"
          className="btn-icon"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">Disable User</span>
        </Button>
      );
    return (
      <>
        {enabled ? (
          <Button
            type="button"
            color="danger"
            onClick={(e) => onDisable({ enabled: false })}
          >
            Disable User
          </Button>
        ) : (
          <Button
            type="button"
            color="success"
            onClick={(e) => onEnable({ enabled: true })}
          >
            Enable User
          </Button>
        )}
      </>
    );
  };

  return (
    <div className="editUser mx-3 mx-md-4 ml-lg-7">
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">Edit User</div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>First Name</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeFirstName}
              type="text"
              placeholder="Enter First Name"
              error={validations}
              name="firstName"
              value={firstName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Last Name</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeLastName}
              type="text"
              placeholder="Enter Last Name"
              error={validations}
              name="lastName"
              value={lastName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Email</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeEmail}
              type="text"
              placeholder="Enter Email"
              error={validations}
              name="email"
              value={email}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Phone Number</Label>
          <Col sm={6}>
            <RtInput
              onChange={changePhoneNumber}
              type="text"
              placeholder="Enter Phone Number"
              error={validations}
              name="phoneNumber"
              value={phoneNumber}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Role</Label>
          <Col sm={6}>
            <Select2
              className="form-control"
              ref={(e) => {
                userRoleRef = e;
              }}
              data={[
                { id: "user", text: "User" },
                { id: "trainer", text: "Trainer" },
                { id: "admin", text: "Admin" },
              ]}
              options={{
                placeholder: "Select role",
              }}
              value={role}
              onChange={(e) => onRoleSelect()}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">
            {getSubmitButton()}
            {getDisableButton()}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default EditUser;
