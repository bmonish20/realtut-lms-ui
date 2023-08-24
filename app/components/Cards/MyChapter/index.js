/**
 *
 * MyChapter
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";
import Tag from "../../Tag";
import { getDurationToToday } from "utils/dateTimeHelpers";
// import styled from 'styled-components';

import "./myChapterStyle.scss";

function MyChapter({
  id,
  title,
  type,
  level,
  link,
  updatedAt,
  onEdit,
  onDelete
}) {
  const duration = getDurationToToday(updatedAt);

  const getOptions = () => (<>
    <Col className="text-right">
      <i
        className="far fa-edit text-muted text-sm hover-pointer hover-color-primary mr-2"
        onClick={() => onEdit(id)}
      />
      <i
        className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
        onClick={() => onDelete(id, title)}
      />
    </Col>
  </>);

  const redirectToMeeting = () => {
    const isHost = 1;
    window.open(
      `/meeting/start?link=${link}&isHost=${isHost}`,
      "_blank");
  }

  return <div className="myChapter">
    <Card>
      <CardBody>
        <Row className="ml-1">
          <span className="h2 text-primary">{title}</span>
          {getOptions()}
        </Row>
        <Row className="mt-2 ml-1">
          <span><Tag title={level} className="text-sm"/></span>
          <span className="ml-2">
            <div
              className={`tag bg-primary
              px-2 py-1 rounded border border-primary`}
            >
            <div className="text-xs text-secondary">{type}</div>
            </div>
          </span>
        </Row>
        <Row className="text-xs text-muted mt-3 ml-1">
          <Col>
            <Row>
              Last updated:
              <div className="ml-1">{duration}</div>
            </Row>
          </Col>
          <Col className="text-right">
            <Button
              outline
              color="primary"
              type="button"
              size="sm"
              onClick={() => redirectToMeeting()}
            >
              Start Meeting
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </div>;
}

MyChapter.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default memo(MyChapter);
