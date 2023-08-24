/**
 *
 * TaskTable
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { parseDateTime } from "utils/dateTimeHelpers";
import history from "utils/history";
import "./taskTableStyle.scss";

export function TaskTableSkeleton() {
  return (
    <Card className="mx-3 w-100">
      <CardBody>
        <Skeleton count={3} />
      </CardBody>
    </Card>
  );
}

function TaskTable({ tasks = [] }) {
  const getPriority = (priority) => {
    switch (priority) {
      case "1":
        return (
          <h2>
            <Badge color="danger">High</Badge>
          </h2>
        );
      case "2":
        return (
          <h2>
            <Badge color="warning">Medium</Badge>
          </h2>
        );
      default:
        return (
          <h2>
            <Badge color="success">Low</Badge>
          </h2>
        );
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "Completed":
        return (
          <h2>
            <Badge color="success">Completed</Badge>
          </h2>
        );
      case "On-Hold":
        return (
          <h2>
            <Badge color="warning">On-Hold</Badge>
          </h2>
        );
      case "In Progress":
        return (
          <h2>
            <Badge color="default">In Progress</Badge>
          </h2>
        );
      default:
        return (
          <h2>
            <Badge color="primary">Open</Badge>
          </h2>
        );
    }
  };

  const getTableBody = () => {
    if (!tasks || tasks.length == 0) {
      return (
        <ListGroupItem>
          <Row className="text-sm text-muted justify-content-center">
            No Tasks Added
          </Row>
        </ListGroupItem>
      );
    }
    return tasks.map((task) => {
      const { date } = parseDateTime(task.dueDate);
      const { time: parsedTime } = parseDateTime(task.time);
      const priority = getPriority(task.priority);
      const status = getStatus(task.status);
      return (
        <ListGroupItem key={task.id}>
          <Row>
            <Col
              xs="4"
              md="3"
              className="text-sm hover-pointer"
              onClick={() => history.push("/tasks")}
            >
              {task.taskName}
            </Col>
            <Col className="text-sm text-muted d-none d-md-block">
              <i className="ni ni-calendar-grid-58 mr-1" />
              {date}
            </Col>
            <Col className="text-xs text-muted d-block d-md-none">
              <Row>{date}</Row>
              <Row>{parsedTime}</Row>
            </Col>
            <Col className="text-sm d-none d-md-block">{priority}</Col>
            <Col className="text-sm d-none d-md-block">{status}</Col>
            <Col className="d-block d-md-none text-right">
              {priority}
              {status}
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
  };

  return (
    <div className="taskTable w-100">
      <Card className="mx-3">
        <CardBody>
          <ListGroup className="list my--3" flush>
            {/* <tbody> */}
            {getTableBody()}
            {/* </tbody> */}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.array.isRequired,
};

TaskTable.defaultProps = {
  tasks: [],
};

export default memo(TaskTable);
