/**
 *
 * Webinar
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import Can from "../../components/Can";
import Tag from "../../components/Tag";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import CopyToClipBoard from "../../components/CopyToClipBoard";
import { useInjectReducer } from "utils/injectReducer";
import { permissions } from "utils/permissions";
import history from "utils/history";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import moment from "moment-timezone";
import "./webinarStyle.scss";

export default function Webinar({ match, ...rest }) {
  useInjectReducer({ key: "webinarDetail", reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(["user"]);

  const state = useSelector((state) => ({
    title: selectors.title(state),
    type: selectors.type(state),
    dateTime: selectors.dateTime(state),
    date: selectors.date(state),
    time: selectors.time(state),
    hostedById: selectors.hostedById(state),
    hostedBy: selectors.hostedBy(state),
    hostedByPictureUrl: selectors.hostedByPictureUrl(state),
    shortDescription: selectors.shortDescription(state),
    description: selectors.description(state),
    webinarLink: selectors.webinarLink(state),
    registeredCount: selectors.registeredCount(state),
    tags: selectors.tags(state),
    isUserRegistered: selectors.isUserRegistered(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/events");
    } else {
      dispatch(operations.fetchWebinar(id));
    }
    return () => dispatch(operations.webinarDetailsInit());
  }, []);

  const redirectToWebinar = (e) => {
    const isHost = state.hostedById === selectors.getUserId(cookie) ? 1 : 0;
    window.open(
      `/watch/${match.params.id}?link=${state.webinarLink}&startTime=${
        state.dateTime
      }&isHost=${isHost}`,
      "_blank"
    );
  };

  const getWebinarLoading = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Skeleton count={2} />
          </CardHeader>
          <CardBody>
            <Row className="mx-2 mb-3">
              <Col xs="2">
                <Skeleton circle={true} height={50} width={50} />
              </Col>
              <Col xs="4">
                <Skeleton height={11} />
                <Skeleton height={10} />
              </Col>
            </Row>
            <Skeleton count={2} height={15} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Skeleton width={100} className="mb-4" />
            <Skeleton count={6} className="mb-2" />
          </CardBody>
        </Card>
      </>
    );
  };

  const onBook = () => {
    AlertPopupHandler.openCustom({
      onConfirm: () =>
        dispatch(operations.registerUserToEvent(match.params.id)),
      confirmBtnText: "Confirm",
      text: `You are about to book a seat for "${
        state.title
      }". Do you want to continue?`,
      data: {},
      warning: false,
      btnSize: "sm",
      confirmBtnBsStyle: "primary",
      cancelBtnBsStyle: "outline-primary",
      title: "Confirm Booking",
    });
  };

  const onUnbook = () => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.removeEventRegistration(match.params.id)),
      confirmBtnText: "Remove",
      text: `You are about to de-register for "${
        state.title
      }". Do you want to continue?`,
      data: {},
      warning: true,
      btnSize: "sm",
      title: "Confirm Un-Booking",
      customClass: "text-xs",
    });
  };

  const getBookingButton = () => {
    if (moment().isAfter(state.dateTime)) {
      return "";
    } else if (state.isUserRegistered) {
      return (
        <Can permissions={[permissions.BOOK_AN_EVENT]}>
          <Button
            size="sm"
            className="btn-icon btn-3"
            color="success"
            type="button"
            onClick={onUnbook}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-check" />
            </span>
            <span className="btn-inner--text">Seat Booked</span>
          </Button>
        </Can>
      );
    }

    return (
      <Can permissions={[permissions.BOOK_AN_EVENT]}>
        <Button
          size="sm"
          className="btn-icon btn-3"
          color="primary"
          type="button"
          onClick={onBook}
        >
          <span className="btn-inner--icon">
            <i className="ni ni-laptop" />
          </span>
          <span className="btn-inner--text">Book your Seat</span>
        </Button>
      </Can>
    );
  };

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right mb-3">
        <Can
          permissions={[
            permissions.EDIT_ALL_EVENT,
            {
              permission: permissions.EDIT_MY_EVENT,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => history.push(`/add-event?id=${match.params.id}`)}
          />
        </Can>
        <Can
          permissions={[
            permissions.DELETE_ALL_EVENT,
            {
              permission: permissions.DELETE_MY_EVENT,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-trash-alt text-muted hover-pointer hover-color-danger"
            onClick={() => onDelete(match.params.id, state.title)}
          />
        </Can>
      </Col>
    </>
  );

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteEvent(id)),
      confirmBtnText: "Delete",
      text: `You are about to delete "${title}". Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const getWebinarComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col xs="12" md="10">
                <span className="h1 text-primary">{state.title}</span>
                <Row className="mx-0 mt-1 text-sm text-primary font-weight-bolder">
                  Event Type:{" "}
                  <span className="ml-1 text-capitalize">{state.type}</span>
                </Row>
                <Row className="mx-1 mt-3 text-md text-muted">
                  <div className="mr-3">
                    <i className="ni ni-calendar-grid-58 mr-1" />
                    {state.date}
                  </div>
                  <div className="mr-3">
                    <i className="far fa-clock mr-1" />
                    {state.time}
                  </div>
                  <div>
                    <i className="fas fa-globe mr-1" />
                    {state.registeredCount} Registered
                  </div>
                </Row>
              </Col>
              <Col md="2" className="mt-3 mt-md-0">
                {getOptions(state.hostedById == selectors.getUserId(cookie))}
                {getBookingButton()}
                {state.webinarLink ? (
                  <Button
                    size="sm"
                    className="mt-0 mt-md-3"
                    outline
                    color="primary"
                    onClick={redirectToWebinar}
                    target="_blank"
                  >
                    To Event
                  </Button>
                ) : null}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="mx-2 mb-3">
              <a
                className="avatar avatar-sm rounded-circle hover-pointer"
                onClick={(e) => history.push(`/trainer?id=${state.hostedById}`)}
              >
                {state.hostedByPictureUrl ? (
                  <img alt="..." src={state.hostedByPictureUrl} />
                ) : (
                  <i className="ni ni-circle-08 text-xl" />
                )}
              </a>
              <Col xs="9" md="6" className="ml-3 text-muted">
                <Row
                  className="font-weight-bold hover-pointer"
                  onClick={(e) =>
                    history.push(`/trainer?id=${state.hostedById}`)
                  }
                >
                  {state.hostedBy}
                </Row>
                <Row className="text-xs">{"Host"}</Row>
              </Col>
              <Col className="mt-3 mt-md-0 text-right">
                <Button
                  size="sm"
                  className="mt-0 mt-md-3"
                  outline
                  color="primary"
                >
                  Like
                </Button>
                <CopyToClipBoard
                  text={`${window.location.origin}${location.pathname}`}
                >
                  <Button
                    size="sm"
                    className="mt-0 mt-md-3"
                    outline
                    color="primary"
                  >
                    Share
                  </Button>
                </CopyToClipBoard>
                <Button
                  size="sm"
                  className="mt-0 mt-md-3"
                  outline
                  color="primary"
                >
                  Follow
                </Button>
              </Col>
            </Row>
            <Row className="mx-2 mb-3 text-sm text-muted">
              {state.shortDescription}
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="mb-3">
              <span className="h3 text-muted">Description</span>
            </div>
            <p className="text-left">{state.description}</p>
            <span className="h4 text-muted">Tags</span>
            <Row className="mt-2 mx-1">
              {state.tags.map((tag, index) => (
                <Tag key={`tag-${index}`} className="mr-2" title={tag} />
              ))}
            </Row>
          </CardBody>
        </Card>
      </>
    );
  };

  return (
    <div className="webinar webinars mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Event</title>
        <meta name="description" content="Description of Webinar" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="9">
          {state.isLoading ? getWebinarLoading() : getWebinarComponent()}
        </Col>
      </Row>
    </div>
  );
}

Webinar.propTypes = {};
