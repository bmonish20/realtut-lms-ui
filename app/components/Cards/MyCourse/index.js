/**
 *
 * MyCourse
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Button,
  Progress,
} from "reactstrap";
import Tag from "../../Tag";
import Skeleton from "react-loading-skeleton";
import * as selectors from "./selectors";
import history from "utils/history";
// import styled from 'styled-components';

import "./myCourseStyle.scss";

export const MyCourseLoading = () => (
  <div className="myCourse">
    <Card>
      <CardHeader>
        <Skeleton count={2} />
      </CardHeader>
      <CardBody>
        <Row className="mb-3">
          <Col xs="2">
            <Skeleton circle={true} height={45} width={45} />
          </Col>
          <Col xs="4">
            <Skeleton height={11} />
            <Skeleton height={10} />
          </Col>
        </Row>
        <Skeleton count={3} />
        <Row className="mt-3">
          <Col xs="3">
            <Skeleton />
          </Col>
        </Row>
      </CardBody>
    </Card>
  </div>
);

function MyCourse({
  id,
  title,
  type,
  summary,
  hostedBy,
  totalChapters,
  currentChapter,
}) {
  const hostedByPictureUrl = selectors.hostedByPicture(hostedBy);

  const progressPercentage =
    currentChapter / totalChapters
      ? Math.ceil((currentChapter / totalChapters) * 100)
      : 0;

  const getPlayButtons = () => {
    if (currentChapter === 0)
      return (
        <Button
          size="sm"
          className="btn-icon btn-3"
          color="primary"
          type="button"
          onClick={() => history.push(`course/${id}/play?start=0`)}
        >
          <span className="btn-inner--icon">
            <i className="fas fa-play-circle" />
          </span>
          <span className="btn-inner--text">Start</span>
        </Button>
      );
    else if (currentChapter === totalChapters)
      return (
        <Button
          size="sm"
          className="btn-icon btn-3"
          color="primary"
          type="button"
          onClick={() => history.push(`course/${id}/play?start=0`)}
        >
          <span className="btn-inner--icon">
            <i className="fas fa-redo-alt" />
          </span>
          <span className="btn-inner--text">Start Over</span>
        </Button>
      );

    return (
      <>
        <Button
          size="sm"
          className="btn-icon btn-3"
          color="primary"
          type="button"
          onClick={() =>
            history.push(`course/${id}/play?start=${currentChapter}`)
          }
        >
          <span className="btn-inner--icon">
            <i className="fas fa-play-circle" />
          </span>
          <span className="btn-inner--text">Resume</span>
        </Button>
        <Button
          size="sm"
          className="btn-icon btn-3"
          outline={true}
          color="primary"
          type="button"
          onClick={() => history.push(`course/${id}/play?start=${0}`)}
        >
          <span className="btn-inner--icon">
            <i className="fas fa-redo-alt" />
          </span>
          <span className="btn-inner--text">Start Over</span>
        </Button>
      </>
    );
  };

  return (
    <div className="myCourse">
      <Card>
        <CardHeader>
          <strong className="text-primary text-lg">{title}</strong>
          <Tag title={type} className="text-capitalize mt-2" />
        </CardHeader>
        <CardBody>
          <Row className="mx-2 mb-3 hover-pointer">
            <a
              className="avatar avatar-sm rounded-circle"
              onClick={(e) =>
                history.push(`/trainer?id=${selectors.hostedById(hostedBy)}`)
              }
            >
              {hostedByPictureUrl ? (
                <img alt="..." src={hostedByPictureUrl} />
              ) : (
                <i className="ni ni-circle-08 text-xl" />
              )}
            </a>
            <Col className="ml-3 text-muted">
              <Row
                className="font-weight-bold hover-pointer"
                onClick={(e) =>
                  history.push(`/trainer?id=${selectors.hostedById(hostedBy)}`)
                }
              >
                {selectors.hostedByName(hostedBy)}
              </Row>
              <Row className="text-xs">{selectors.hostedByTitle(hostedBy)}</Row>
            </Col>
          </Row>
          <CardText className="text-sm text-muted mb-3">{summary}</CardText>
          <div className="progress-wrapper pt-0 mb-4">
            <div className="progress-info">
              <div className="progress-label">
                <span className="text-xs text-primary">Progress:</span>
              </div>
              <div className="progress-percentage">
                <span className="text-xs text-primary">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <Progress
              max={totalChapters}
              value={currentChapter}
              color="primary"
            />
          </div>
          {getPlayButtons()}
        </CardBody>
      </Card>
    </div>
  );
}

MyCourse.propTypes = {};

export default memo(MyCourse);
