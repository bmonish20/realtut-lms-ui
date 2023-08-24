/**
 *
 * TaskDetails
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import { getPriority, getStatus } from "utils/taskDetailsHelpers";
import ContentViewer from "components/ContentViewer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import reducer from "./reducer";
import "./taskDetailsStyle.scss";

export default function TaskDetails() {
  useInjectReducer({ key: "taskDetails", reducer });
  const dispatch = useDispatch();
  const taskDetailsInit = operations.taskDetailsInit(dispatch);

  const {
    taskName,
    category,
    subCategory,
    client,
    startDate,
    dueDate,
    time,
    priority,
    description,
    status,
    fileUrl,
    timeLeft,
  } = useSelector((state) => ({
    taskName: selectors.taskName(state),
    category: selectors.category(state),
    subCategory: selectors.subCategory(state),
    client: selectors.client(state),
    startDate: selectors.startDate(state),
    dueDate: selectors.dueDate(state),
    time: selectors.time(state),
    priority: selectors.priority(state),
    description: selectors.description(state),
    status: selectors.status(state),
    fileUrl: selectors.fileUrl(state),
    timeLeft: selectors.timeLeft(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }

    return () => taskDetailsInit();
  }, []);

  return (
    <div className="taskDetails mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>TaskDetails</title>
        <meta name="description" content="Description of TaskDetails" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12">
          <Card>
            <CardHeader>
              <Row className="px-1">
                <Col xs="12" md="7">
                  <span className="h1 text-primary">{taskName}</span>
                </Col>
              </Row>
              <Row className="mx-1 mt-3 text-md text-muted">
                <div className="mr-3">
                  <i className="ni ni-calendar-grid-58 mr-1" />
                  Start Date:{startDate}
                </div>
                <div className="mr-3">
                  <i className="ni ni-calendar-grid-58 mr-1" />
                  Due Date:{dueDate}
                </div>
                <div className="mr-3">
                  <i className="far fa-clock mr-1" />
                  {time}
                </div>
                <div className="mr-3">
                  <i className="far fa-clock mr-1" />
                  Time Left: {timeLeft}
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="mx-1 text-md">
                <div className="mr-3">Priority: {getPriority(priority)}</div>
                <div className="mr-3">Status: {getStatus(status)}</div>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-3">
                <span className="h3 text-muted">Project Details</span>
              </div>
              <Row className="mx-1 text-md">
                <div className="mr-3">
                  <span className="text-muted">Category:</span>{" "}
                  {category || "-"}
                </div>
                <div className="mr-3">
                  <span className="text-muted">Sub Category:</span>{" "}
                  {subCategory || "-"}
                </div>
                <div className="mr-3">
                  <span className="text-muted">Client: </span>
                  {client || "-"}
                </div>
              </Row>
            </CardHeader>
          </Card>
          <Card>
            <CardBody>
              <div className="mb-3">
                <span className="h3 text-muted">Description</span>
              </div>
              <ContentViewer className="text-left" content={description} />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="mb-3">
                <span className="h3 text-muted">Attached Files</span>
              </div>
              <div>
                {fileUrl.map((file, index) => (
                  <Button
                    type="button"
                    color="info"
                    size="sm"
                    onClick={(e) => window.open(file, "_blank")}
                  >
                    <span className="btn-inner--icon">
                      <i className="fas fa-paperclip" />
                    </span>{" "}
                    File {index + 1}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

TaskDetails.propTypes = {};
