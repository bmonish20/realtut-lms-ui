/**
 *
 * InviteUser
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button, Label, Form, FormGroup, Spinner } from "reactstrap";
import RtInput from "../../components/RtInput/index";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./inviteUserStyle.scss";

export default function InviteUser({ onConfirm, onCancel }) {
  useInjectReducer({ key: "inviteUser", reducer });
  const dispatch = useDispatch();
  const changeName = operations.changeName(dispatch);
  const changeEmail = operations.changeEmail(dispatch);
  const inviteUserInit = operations.inviteUserInit(dispatch);

  React.useEffect(() => {
    return () => inviteUserInit();
  }, []);

  const { name, email, isLoading, validations } = useSelector((state) => ({
    name: selectors.name(state),
    email: selectors.email(state),
    isLoading: selectors.isLoading(state),
    validations: selectors.validations(state),
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit(
        {
          name,
          email,
        },
        onConfirm
      )
    );
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="default" size="sm" disabled={true}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            className="btn-icon"
            disabled={true}
            size="sm"
          >
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">Invite</span>
          </Button>
        </>
      );

    return (
      <>
        <Button type="default" size="sm" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          color="primary"
          onClick={(e) => onSubmit(e)}
        >
          Invite
        </Button>
      </>
    );
  };
  return (
    <div className="inviteUser">
      <Helmet>
        <title>Invite User</title>
        <meta name="description" content="Description of InviteUser" />
      </Helmet>
      <Row className="my-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">Invite User</div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label for="title" sm={3}>
            Name
          </Label>
          <Col>
            <RtInput
              onChange={changeName}
              type="text"
              error={validations}
              placeholder="Enter user's name"
              name="name"
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="title" sm={3}>
            Email
          </Label>
          <Col>
            <RtInput
              onChange={changeEmail}
              type="email"
              placeholder="Enter user's email"
              name="email"
              error={validations}
              value={email}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

InviteUser.propTypes = {};
