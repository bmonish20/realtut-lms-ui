/**
 *
 * ActivityTable
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import { Card, CardBody } from "reactstrap";
// import styled from 'styled-components';
import moment from "moment-timezone";

import "./activityTableStyle.scss";

function ActivityTable({ activityFeed = [] }) {
  const getBadge = (activityType) => {
    switch (activityType) {
      case "task":
        return (
          <span className="timeline-step badge-warning">
            <i className="fas fa-tasks text-secondary" />
          </span>
        );
      case "quiz":
        return (
          <span className="timeline-step badge-primary">
            <i className="ni ni-hat-3 text-secondary" />
          </span>
        );
      case "event":
        return (
          <span className="timeline-step badge-success">
            <i className="ni ni-laptop text-secondary" />
          </span>
        );
      case "course":
        return (
          <span className="timeline-step badge-danger">
            <i className="fas fa-book text-secondary" />
          </span>
        );
      case "article":
        return (
          <span className="timeline-step badge-info">
            <i className="far fa-newspaper text-secondary" />
          </span>
        );
      default:
        return (
          <span className="timeline-step badge-success">
            <i className="ni ni-bell-55 text-secondary" />
          </span>
        );
    }
  };

  return (
    <div className="activityTable w-100">
      <Card className="mx-3">
        <CardBody>
          {activityFeed.map((activity, index) => (
            <div
              key={index}
              className="timeline timeline-one-side"
              data-timeline-axis-style="dashed"
              data-timeline-content="axis"
            >
              <div className="timeline-block">
                {getBadge(activity.activityType)}
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
    </div>
  );
}

ActivityTable.propTypes = {};

export default memo(ActivityTable);
