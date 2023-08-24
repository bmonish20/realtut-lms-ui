/**
 *
 * Course
 *
 */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import Can from "components/Can";
import Tag from "components/Tag";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import ContentViewer from "components/ContentViewer";
import CopyToClipBoard from "components/CopyToClipBoard";
import Rating from "react-simple-star-rating";
import { useInjectReducer } from "utils/injectReducer";
import { permissions } from "utils/permissions";
import history from "utils/history";
import AddPoll from "../AddPoll";
import Forum from "../Forum";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./courseStyle.scss";

export default function Course({ match }) {
  useInjectReducer({ key: "course", reducer });
  const [cookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const state = useSelector((state) => ({
    title: selectors.title(state),
    type: selectors.type(state),
    date: selectors.date(state),
    time: selectors.time(state),
    startDate: selectors.startDate(state),
    hostedBy: selectors.hostedBy(state),
    hostedById: selectors.hostedById(state),
    hostedByPictureUrl: selectors.hostedBypictureUrl(state),
    shortDescription: selectors.shortDescription(state),
    description: selectors.description(state),
    prerequisite: selectors.prerequisite(state),
    tags: selectors.tags(state),
    chapters: selectors.chapters(state),
    isUserRegistered: selectors.isUserRegistered(state),
    isUserReviewed: selectors.isUserReviewed(state),
    rating: selectors.rating(state),
    ratingId: selectors.ratingId(state),
    courseRating: selectors.courseRating(state),
    isLoading: selectors.isLoading(state),
    pollId: selectors.pollId(state),
    pollQuestion: selectors.pollQuestion(state),
    pollAnswers: selectors.pollAnswers(state),
    forumMessagesLength: selectors.forumMessagesLength(state),
  }));

  React.useEffect(() => {
    const { id } = match.params;
    if (!id) {
      history.push("/courses");
    } else {
      dispatch(operations.fetchCourse(id));
    }
    return () => dispatch(operations.courseDetailsInit());
  }, []);

  const getCourseLoading = () => {
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
        dispatch(operations.registerUserToCourse(match.params.id)),
      confirmBtnText: "Confirm",
      text: (
        <>
          Confirm interest in{" "}
          <span className="font-weight-bold ">{state.title}</span>?
        </>
      ),
      data: {},
      warning: false,
      btnSize: "sm",
      confirmBtnBsStyle: "primary",
      cancelBtnBsStyle: "outline-primary",
      title: "Confirm",
    });
  };

  const onUnbook = () => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.removeCourseRegistration(match.params.id)),
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

  const addAPoll = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: AddPoll,
      ChildProps: {
        isAddPoll: true,
        courseId: match.params.id,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const submitAPoll = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: AddPoll,
      ChildProps: {
        isAddPoll: false,
        courseId: match.params.id,
        pollId: state.pollId,
        pollQuestion: state.pollQuestion,
        pollAnswers: state.pollAnswers,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const getBookingButton = () => {
    if (state.isUserRegistered) {
      return (
        <Can permissions={[permissions.BOOK_A_COURSE]}>
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
            <span className="btn-inner--text">Interested</span>
          </Button>
        </Can>
      );
    }
    return (
      <Can permissions={[permissions.BOOK_A_COURSE]}>
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
          <span className="btn-inner--text">Show Interest</span>
        </Button>
      </Can>
    );
  };

  const getPollButton = () => {
    return (
      <>
        <Can permissions={[permissions.BOOK_A_COURSE]}>
          {state.pollId ? (
            <Button
              size="sm"
              className="btn-icon btn-3 mx-2"
              color="primary"
              type="button"
              onClick={submitAPoll}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-poll" />
              </span>
              <span className="btn-inner--text">Submit a Poll</span>
            </Button>
          ) : (
            ""
          )}
        </Can>
        <Can permissions={[permissions.ADD_COURSE]}>
          <Button
            size="sm"
            className="btn-icon btn-3 mx-2"
            color="primary"
            type="button"
            onClick={addAPoll}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-poll" />
            </span>
            <span className="btn-inner--text">Add a Poll</span>
          </Button>
        </Can>
      </>
    );
  };

  const getReviewButton = () => {
    return (
      <Rating
        onClick={(e) => {
          state.ratingId
            ? dispatch(
                operations.updateTheReview(match.params.id, state.ratingId, e)
              )
            : dispatch(operations.reviewTheCourse(match.params.id, e));
        }}
        ratingValue={state.rating}
        size={20}
        fillColor="orange"
        className="foo"
      />
    );
  };

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right mb-3">
        <Can
          permissions={[
            permissions.EDIT_ALL_COURSE,
            {
              permission: permissions.EDIT_MY_COURSE,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-edit text-muted hover-pointer hover-color-primary mr-2"
            onClick={() => history.push(`/edit-course?id=${match.params.id}`)}
          />
        </Can>
        <Can
          permissions={[
            permissions.DELETE_ALL_COURSE,
            {
              permission: permissions.DELETE_MY_COURSE,
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
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{title}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const getCourseComponent = () => {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="px-1">
              <Col xs="12" md="7">
                <span className="h1 text-primary">{state.title}</span>
                <Row className="mx-0 mt-1 text-sm text-primary font-weight-bolder">
                  Type:{" "}
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
                  <div className="mr-3">
                    Rating: {state.courseRating} <i class="fas fa-star" />
                  </div>
                </Row>
              </Col>
              <Col md="5" className="mt-3 mt-md-0">
                {getOptions(state.hostedById === selectors.getUserId(cookie))}
                {getBookingButton()}
                {getPollButton()}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="mx-2 mb-3">
              <a
                className="avatar avatar-sm rounded-circle hover-pointer"
                onClick={(e) =>
                  history.push(`/trainer/?id=${state.hostedById}`)
                }
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
                    history.push(`/trainer/?id=${state.hostedById}`)
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
              <span className="h3 text-muted">Pre-Requisite</span>
            </div>
            <ContentViewer className="text-left" content={state.prerequisite} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="mb-3">
              <span className="h3 text-muted">Description</span>
            </div>
            <ContentViewer className="text-left" content={state.description} />
            <span className="h4 text-muted">Tags</span>
            <Row className="mt-2 mx-1">
              {state.tags.map((tag, index) => (
                <Tag key={`tag-${index}`} className="mr-2" title={tag} />
              ))}
            </Row>
          </CardBody>
        </Card>
        {state.chapters.length !== 0 && (
          <Card>
            <CardBody>
              <div className="mb-3">
                <span className="h3 text-muted">Chapters</span>
              </div>
              <div className="mx-3">
                {state.chapters.map(getChapterComponent)}
              </div>
            </CardBody>
          </Card>
        )}
        <Card>
          <CardBody>
            <div className="mb-3">
              <span className="h3 text-muted">Leave your review</span>
            </div>
            {getReviewButton()}
          </CardBody>
        </Card>
      </>
    );
  };

  const getChapterComponent = (chapter, count) => (
    <Row
      key={chapter.id}
      className={classnames(
        `bg-gradient-secondary px-2 py-1
        rounded border border-primary`,
        {
          "mt-3": count !== 0,
        }
      )}
    >
      <div>Chapter {count + 1}:</div>
      <Col>{chapter.title}</Col>
    </Row>
  );

  return (
    <div className="course mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Course</title>
        <meta name="description" content="Description of Course" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md={state.isUserRegistered ? "8" : "9"}>
          {state.isLoading ? getCourseLoading() : getCourseComponent()}
        </Col>
        {state.isUserRegistered && (
          <Col xs="12" md="4">
            <Forum
              courseId={match.params.id}
              forumMessagesLength={state.forumMessagesLength}
            />
          </Col>
        )}
      </Row>
    </div>
  );
}

Course.propTypes = {};
