import React from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import RtPassword from "../../components/RtPassword/index";

function Register() {
  useInjectReducer({ key: "registerPage", reducer });
  const dispatch = useDispatch();
  const changeName = operations.changeName(dispatch);
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const registerInit = operations.registerInit(dispatch);
  const toggleEmailVerify = operations.toggleEmailVerify(dispatch);
  const changeEmailCode = operations.changeEmailCode(dispatch);

  const {
    name,
    email,
    password,
    isLoading,
    errorMessage,
    validations,
    showEmailVerification,
    emailCode,
    googleKey,
  } = useSelector((state) => ({
    name: selectors.fullname(state),
    email: selectors.email(state),
    password: selectors.password(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    showEmailVerification: selectors.showEmailVerification(state),
    emailCode: selectors.emailCode(state),
    googleKey: selectors.googleKey(state),
  }));

  const disableResendCode = useSelector((state) =>
    selectors.disableResendCode(state)
  );

  React.useEffect(() => {
    dispatch(operations.setOAuthConfig());
  }, []);

  const onGoogleLogin = (data) => {
    dispatch(operations.onGoogleLogin(data));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      operations.onSubmit({
        name,
        email,
        password,
      })
    );
  };

  const onVerify = (e) => {
    e.preventDefault();

    return dispatch(
      operations.verifyCode({
        email,
        code: emailCode,
      })
    );
  };
  const getSubmitButton = (buttonText, onClick) => {
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
          <span className="btn-inner-text">{buttonText}</span>
        </Button>
      );
    return (
      <Button
        type="button"
        color="primary"
        onClick={(e) => onClick(e)}
        type="submit"
      >
        {buttonText}
      </Button>
    );
  };

  const getEmailVerification = () => {
    return (
      <div>
        <Row className="mb-3 justify-content-center">
          <div className="text-xs text-center text-primary">
            We have sent an OTP to your registered email address, Kindly enter
            it to verify your login attempt
          </div>
        </Row>
        <Form className="mb-4" onSubmit={(e) => onVerify(e)}>
          <FormGroup className="mb-3 px-4">
            <RtInput
              onChange={changeEmailCode}
              type="text"
              placeholder="Verification Code"
              name="code"
              error={validations}
              value={emailCode}
              className="text-center text-primary text-bold"
            />
          </FormGroup>
          <Row className="justify-content-center mb-3">
            {getSubmitButton("Continue", onVerify)}
          </Row>
          {getErrorComponent()}
        </Form>
        <Row className="mb-3 justify-content-center">
          <div className="text-xs text-center text-muted">
            <div>Didn't receive the verification code yet?</div>
            <Button
              className="ml-2 pl-0"
              size="sm"
              color="link"
              onClick={() => dispatch(operations.resendCode(email))}
              disabled={disableResendCode}
            >
              Resend Code
            </Button>
          </div>
        </Row>
      </div>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  const getRegisterForm = () => (
    <>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3" value={name}>
          <RtInput
            onChange={changeName}
            icon="ni-single-02"
            type="text"
            placeholder="Full Name"
            error={validations}
            name="name"
            value={name}
          />
        </FormGroup>
        <FormGroup className="mb-3" value={email}>
          <RtInput
            onChange={changeEmail}
            icon="ni-email-83"
            type="email"
            placeholder="Email Address"
            error={validations}
            name="email"
            value={email}
          />
        </FormGroup>
        <FormGroup className="mb-3" value={password}>
          <RtPassword
            onChange={changePassword}
            icon="ni-lock-circle-open"
            type="password"
            placeholder="Password"
            error={validations}
            name="password"
            value={password}
          />
        </FormGroup>
        <Row className="justify-content-center mb-3">
          {getSubmitButton("Signup", onSubmit)}
        </Row>
        {getErrorComponent()}
        <Row className="justify-content-center mb-4">
          <div className="text-center text-xs text-muted">
            By signing up, I agree to RealTuT's{" "}
            <Link to="/auth/terms" target="_blank">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link to="/auth/privacy" target="_blank">
              Privacy Policy
            </Link>
            .
          </div>
        </Row>
        <Row className="justify-content-center mb-5">
          {googleKey ? (
            <GoogleLogin
              clientId={googleKey}
              buttonText="Continue"
              onSuccess={onGoogleLogin}
              onFailure={(data) => dispatch(operations.userRegisterError(data))}
              render={(props) => (
                <Button
                  disabled={isLoading}
                  className="btn-icon"
                  size="sm"
                  onClick={() => props.onClick()}
                >
                  <span className="btn-inner-icon">
                    <img
                      className="ni"
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner-text text-muted ml-1">
                    Signup with Google
                  </span>
                </Button>
              )}
            />
          ) : null}
        </Row>
        <Row className="justify-content-center">
          <div className="text-center text-xs text-muted">
            Already have an account?{" "}
            <Link to="/auth" onClick={registerInit}>
              Login In
            </Link>
          </div>
        </Row>
      </Form>
    </>
  );

  return (
    <>
      <Container className="py-6 py-lg-8 pt-lg-9">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary">
              <CardHeader>
                <div className="text-center">
                  <h1 className="text-primary">RealTuT</h1>
                </div>
              </CardHeader>
              <CardBody className="mx-md-4 mx-lg-4">
                {showEmailVerification
                  ? getEmailVerification()
                  : getRegisterForm()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
