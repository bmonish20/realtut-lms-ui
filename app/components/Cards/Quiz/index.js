/**
 *
 * Quiz
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import _get from "lodash/get";
import Can from "components/Can";
import * as selectors from "./selectors";
import history from "utils/history";
import { useCookies } from "react-cookie";
import { permissions, useAccess } from "utils/permissions";
import "./quizStyle.scss";

export function Quiz({ title, id, index, onDelete }) {
  return (
    <Card className="quiz">
      <CardBody>
        <Row className="pl-2 text-sm text-primary">
          <Col sm="1">
            <i className="fas fa-bars text-primary" />
          </Col>
          {title}
          <Col className="text-right">
            <i
              className="far fa-trash-alt text-muted text-sm hover-pointer"
              onClick={() => onDelete({ index, id, title })}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
export function QuizCardSkeleton() {
  return (
    <div className="quizCard">
      <Card>
        <CardHeader>
          <Skeleton />
          <Skeleton />
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col xs="4">
              <Skeleton height={25} />
            </Col>
            <Col xs="4">
              <Skeleton height={25} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
export function QuizReviewSkeleton() {
  return (
    <div className="quizCard">
      <Card>
        <CardHeader>
          <Skeleton />
          <Skeleton />
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col xs="4">
              <Skeleton height={25} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export function ReviewCard({ id, attendedBy, response, onDelete, onReview }) {
  return (
    <div className="reviewCard">
      <Card>
        <CardHeader>
          <Row className="mb-2 text-primary text-lg">
            <Col xs="9">{attendedBy}</Col>
            <Col className="text-right">
              <i
                className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
                onClick={() => onDelete(id)}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="mx-2">
            <Button
              size="sm"
              className="btn-icon btn-3"
              color="success"
              type="button"
              onClick={() => onReview(id)}
            >
              <span className="btn-inner--icon">
                <i className="ni ni-ruler-pencil" />
              </span>
              <span className="btn-inner--text">Review</span>
            </Button>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
function QuizCard({
  id,
  quizName,
  forCourse,
  createdBy,
  totalScore,
  quizResponse,
  onViewScore,
  onDelete,
  onEdit,
  onReview,
}) {
  const [cookie] = useCookies(["user"]);
  const createdByPicture = selectors.createdByPicture(createdBy);
  const createdById = selectors.createdById(createdBy);

  const checkForPermission = (permission) => {
    return useAccess(permission);
  };

  return (
    <div className="quizCard">
      <Card>
        <CardHeader>
          <Row className="mb-2 text-primary text-lg">
            {checkForPermission(permissions.ADD_A_QUIZ) ? (
              <Col
                xs="9"
                className="hover-pointer"
                onClick={(e) => history.push(`/quiz-details?id=${id}`)}
              >
                {quizName}
              </Col>
            ) : (
              <Col xs="9">{quizName}</Col>
            )}
            <Col className="text-right">
              <Can
                permissions={[
                  permissions.DELETE_ALL_QUIZ,
                  {
                    permission: permissions.DELETE_MY_QUIZ,
                    value: selectors.getUserId(cookie) == createdById,
                  },
                ]}
              >
                <i
                  className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
                  onClick={() => onDelete(id, quizName)}
                />
              </Can>
            </Col>
          </Row>
          <Row className="mb-2 text-sm text-muted">
            <Col xs="9">{forCourse}</Col>
          </Row>
          <Row className="mx-1 mt-2">
            <a
              className="avatar avatar-xs rounded-circle hover-pointer"
              onClick={(e) => history.push(`/trainer?id=${createdById}`)}
            >
              {createdByPicture ? (
                <img alt="..." src={createdByPicture} />
              ) : (
                <i className="ni ni-circle-08 text-lg" />
              )}
            </a>
            <Col
              className="text-muted pl-2 hover-pointer"
              onClick={(e) => history.push(`/trainer?id=${createdById}`)}
            >
              <span className="text-xs text-muted">
                {selectors.createdByName(createdBy)}
              </span>
            </Col>
          </Row>
        </CardHeader>
        <Can permissions={[permissions.ATTEND_A_QUIZ]}>
          <CardBody>
            <Row className="mx-2 justify-content-between">
              <Button
                size="sm"
                className="btn-icon btn-3"
                color="success"
                type="button"
                disabled={totalScore == 0}
                onClick={() => history.push(`/quiz-form?id=${id}`)}
              >
                <span className="btn-inner--icon">
                  <i className="ni ni-ruler-pencil" />
                </span>
                <span className="btn-inner--text">
                  {totalScore > 0 ? "Re-Take Quiz" : "Attend Quiz"}
                </span>
              </Button>
              {totalScore || totalScore == 0 ? (
                <>
                  <div className="text-muted">{`Score: ${
                    totalScore == 0 ? "Pending" : totalScore
                  }`}</div>
                  <Button
                    size="sm"
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    onClick={() => onViewScore(quizResponse)}
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni-ruler-pencil" />
                    </span>
                    <span className="btn-inner--text">View Score</span>
                  </Button>
                </>
              ) : (
                ""
              )}
            </Row>
          </CardBody>
        </Can>
        <Can
          permissions={[
            permissions.REVIEW_ALL_QUIZ,
            {
              permission: permissions.REVIEW_MY_QUIZ,
              value: selectors.getUserId(cookie) == createdById,
            },
          ]}
        >
          <CardBody>
            <Row className="mx-2">
              <Button
                size="sm"
                className="btn-icon btn-3"
                color="success"
                type="button"
                onClick={() => onReview(id)}
              >
                <span className="btn-inner--icon">
                  <i className="ni ni-ruler-pencil" />
                </span>
                <span className="btn-inner--text">Review</span>
              </Button>
              <Button
                size="sm"
                className="btn-icon btn-3"
                color="primary"
                type="button"
                onClick={() => onEdit(id)}
              >
                <span className="btn-inner--icon">
                  <i className="ni ni-ruler-pencil" />
                </span>
                <span className="btn-inner--text">Edit</span>
              </Button>
            </Row>
          </CardBody>
        </Can>
      </Card>
    </div>
  );
}

QuizCard.propTypes = {};

export default memo(QuizCard);
