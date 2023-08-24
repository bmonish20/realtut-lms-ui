/**
 *
 * ActivityFeed
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";
import moment from "moment-timezone";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./activityFeedStyle.scss";

export default function ActivityFeed() {
  useInjectReducer({ key: "activityFeed", reducer });
  const dispatch = useDispatch();
  const { isLoading, activities } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    activities: selectors.activities(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchActivities());
  }, []);

  return (
    <div className="activityFeed mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Activity Feed</title>
        <meta name="description" content="Description of Activity Feed" />
      </Helmet>
      <Row className="w-100">
        <Col>
          <Card>
            <CardHeader className="bg-transparent">
              <h3 className="mb-0">Your Activity</h3>
            </CardHeader>
            <CardBody>
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  <div className="timeline-block">
                    {activity.activityType == "task" ? (
                      <span className="timeline-step badge-warning">
                        <i className="fas fa-tasks text-secondary" />
                      </span>
                    ) : activity.activityType == "quiz" ? (
                      <span className="timeline-step badge-primary">
                        <i className="ni ni-hat-3 text-secondary" />
                      </span>
                    ) : activity.activityType == "event" ? (
                      <span className="timeline-step badge-success">
                        <i className="ni ni-laptop text-secondary" />
                      </span>
                    ) : activity.activityType == "course" ? (
                      <span className="timeline-step badge-danger">
                        <i className="fas fa-book text-secondary" />
                      </span>
                    ) : activity.activityType == "article" ? (
                      <span className="timeline-step badge-info">
                        <i className="far fa-newspaper text-secondary" />
                      </span>
                    ) : (
                      <span className="timeline-step badge-success">
                        <i className="ni ni-bell-55 text-secondary" />
                      </span>
                    )}

                    <div className="timeline-content mt-2">
                      <small className="text-muted font-weight-bold">
                        {moment(activity.createdAt).format("LLLL")}
                      </small>
                      <h5 className="mt-3 mb-0">{activity.activityType}</h5>
                      <p className="text-sm mt-1 mb-0">
                        {activity.description} {activity.activityType}.
                      </p>
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

ActivityFeed.propTypes = {};
