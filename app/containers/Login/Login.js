import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { useInjectReducer } from "utils/injectReducer";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link } from "react-router-dom";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import RtPassword from "../../components/RtPassword/index";
import "./loginStyle.scss";

function Login() {
  useInjectReducer({ key: "loginPage", reducer });
  const dispatch = useDispatch();
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const loginInit = operations.loginInit(dispatch);

  const {
    email,
    password,
    isLoading,
    errorMessage,
    validations,
    googleKey,
    facebookKey,
  } = useSelector((state) => ({
    email: selectors.email(state),
    password: selectors.password(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    googleKey: selectors.googleKey(state),
    facebookKey: selectors.facebookKey(state),
  }));

  React.useEffect(() => {
    dispatch(operations.setOAuthConfig());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        email,
        password,
      })
    );
  };

  const onGoogleLogin = (data) => {
    dispatch(operations.onGoogleLogin(data));
  };

  const onFacebookLogin = (data) => {
    dispatch(operations.onFacebookLogin(data));
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
          <span className="btn-inner-text">Login</span>
        </Button>
      );
    return (
      <Button
        type="button"
        color="primary"
        type="submit"
        onClick={(e) => onSubmit(e)}
      >
        Login
      </Button>
    );
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

  const getOAuthComponents = () => {
    if (!googleKey && !facebookKey)
      return <Spinner size="sm" color="primary" />;
    return (
      <div className="text-center text-muted text-xs">
        Login using
        {googleKey ? (
          <GoogleLogin
            clientId={googleKey}
            buttonText="Continue"
            onSuccess={onGoogleLogin}
            onFailure={(data) => dispatch(operations.userLoginError(data))}
            render={(props) => (
              <Button
                outline
                className="btn-icon ml-2 ml-md-3"
                size="sm"
                onClick={props.onClick}
              >
                <span className="bth-inner-icon">
                  <img
                    alt="google"
                    src={require("assets/img/icons/common/google.svg")}
                  />
                </span>
              </Button>
            )}
          />
        ) : null}
        {facebookKey ? (
          <FacebookLogin
            appId={facebookKey}
            fields="name,email,picture"
            callback={onFacebookLogin}
            render={(props) => (
              <Button
                outline
                className="btn-icon"
                size="sm"
                onClick={props.onClick}
              >
                <span className="bth-inner-icon">
                  <i className="fab fa-facebook-square text-huge" />
                </span>
              </Button>
            )}
          />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <Container className="py-6 py-lg-8 pt-lg-9 login">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary">
              <CardHeader>
                <div className="text-center">
                  <h1 className="text-primary">RealTuT</h1>
                </div>
              </CardHeader>
              <CardBody className="mx-md-4 mx-lg-4">
                <Form role="form" onSubmit={(e) => onSubmit(e)}>
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
                  <FormGroup value={password}>
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
                  <Row>
                    <Col xs="6">{getSubmitButton()}</Col>
                    <Col className="text-right" xs="6">
                      <Link
                        to="/auth/resetpassword"
                        className="text-xs"
                        onClick={loginInit}
                      >
                        Forgot Password?
                      </Link>
                    </Col>
                  </Row>
                  {getErrorComponent()}
                  <Row className="justify-content-center">
                    <Col xs="4">
                      <hr />
                    </Col>
                    <Col xs="4" className="text-center text-muted mt-3">
                      or
                    </Col>
                    <Col xs="4">
                      <hr />
                    </Col>
                  </Row>
                  <Row className="justify-content-center mb-1">
                    {getOAuthComponents()}
                  </Row>
                </Form>
                {/* <Row className="justify-content-center">
                  <div className="text-muted text-xs">
                    New User?{" "}
                    <Link to="/auth/register" onClick={loginInit}>
                      Signup now
                    </Link>
                  </div>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
