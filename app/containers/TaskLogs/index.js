/**
 *
 * TaskLogs
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import { Helmet } from "react-helmet";
import moment from "moment-timezone";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import * as selectors from "./selectors";
import * as operations from "./actions";
import reducer from "./reducer";
import "./taskLogsStyle.scss";

export default function TaskLogs() {
  useInjectReducer({ key: "taskLogs", reducer });
  const dispatch = useDispatch();
  const viewHistoryInit = operations.viewHistoryInit(dispatch);

  const { isLoading, taskName, logs } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    taskName: selectors.taskName(state),
    logs: selectors.logs(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => viewHistoryInit();
  }, []);

  return (
    <div className="taskLogs mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>View History - Tasks</title>
        <meta name="description" content="Description of View History" />
      </Helmet>
      <Row className="w-100">
        <Col>
          <Card>
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">{`History of the Task - ${taskName}`}</h3>
            </CardHeader>
            <CardBody>
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  <div className="timiline-block">
                    <span className="timeline-step badge-warning">
                      <i className="fas fa-tasks text-secondary" />
                    </span>

                    <div className="timeline-content mt-2">
                      <small className="text-muted font-weight-bold">
                        {moment(log.dateTime).format("LLLL")}
                      </small>
                      <h5 className="mt-3 mb-0">{log.text}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

TaskLogs.propTypes = {};
