/**
 *
 * TaskCard
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import _get from "lodash/get";
import { parseDateTime } from "utils/dateTimeHelpers";
import "./taskCardStyle.scss";

export function TaskCardSkeleton() {
  return (
    <div className="taskCard">
      <Card>
        <CardHeader>
          <Skeleton />
          <Skeleton />
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
}

function TaskCard({
  id,
  todoName,
  dueDate,
  time,
  status,
  priority,
  description,
  onDelete,
  onEdit,
  onViewHistory,
}) {
  const { date } = parseDateTime(dueDate);
  const { time: parsedTime } = parseDateTime(time);

  const getPriority = (priority) => {
    if (priority === "1")
      return (
        <h2>
          <Badge color="danger">High</Badge>
        </h2>
      );
    else if (priority === "2")
      return (
        <h2>
          <Badge color="warning">Medium</Badge>
        </h2>
      );
    else
      return (
        <h2>
          <Badge color="success">Low</Badge>
        </h2>
      );
  };

  const getStatus = (status) => {
    if (status === "Completed")
      return (
        <h2>
          <Badge color="success">Completed</Badge>
        </h2>
      );
    else if (status === "On-Hold")
      return (
        <h2>
          <Badge color="warning">On-Hold</Badge>
        </h2>
      );
    else if (status === "In Progress")
      return (
        <h2>
          <Badge color="default">In Progress</Badge>
        </h2>
      );
    else
      return (
        <h2>
          <Badge color="primary">Open</Badge>
        </h2>
      );
  };
  return (
    <div className="taskCard">
      <Card>
        <CardHeader>
          <Row className="mb-2 text-primary text-lg">
            <Col xs="9">{todoName}</Col>
            <Col className="text-right">
              <i
                className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
                onClick={() => onDelete(id, todoName)}
              />
            </Col>
          </Row>
          <Row className="mx-1 text-xs text-muted align-items-center">
            <div className="mr-3">
              <i className="ni ni-calendar-grid-58 mr-1" />
              {date}
            </div>
            <div className="mr-3">
              <i className="far fa-clock mr-1" />
              {parsedTime}
            </div>
            <div className="mr-3">
              {getStatus(status)}
              {/* <Tag title={status} /> */}
            </div>
            <div className="mr-3">{getPriority(priority)}</div>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="mx-2 mb-2 text-sm text-muted">{description}</Row>
          <Row className="mx-2">
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
            {/* <Button
              size="sm"
              className="btn-icon btn-3"
              color="primary"
              type="button"
              onClick={() => onViewHistory(id)}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-history" />
              </span>
              <span className="btn-inner--text">View History</span>
            </Button> */}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

TaskCard.propTypes = {};

export default memo(TaskCard);
