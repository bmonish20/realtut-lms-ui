/**
 *
 * UserNotifications
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import * as operations from "./actions";
import reducer from "./reducer";
import * as selectors from "./selectors";
import moment from "moment-timezone";
import "./userNotificationsStyle.scss";

export default function UserNotifications() {
  useInjectReducer({ key: "userNotifications", reducer });
  const dispatch = useDispatch();
  const { notifications, unreadNotifications } = useSelector((state) => ({
    notifications: selectors.notifications(state),
    unreadNotifications: selectors.unreadNotifications(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchNotifications());
  }, []);

  const getNotifications = () => {
    return notifications.map((notification, index) => (
      <ListGroupItem
        key={index}
        className={classnames("list-group-item-action", {
          "bg-secondary": notification.status == "Read",
        })}
        onClick={(e) => dispatch(operations.markAsRead(notification.id))}
        tag="a"
      >
        <Row className="align-items-center">
          <div className="col ml-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0 text-sm">{notification.title}</h4>
              </div>
              <div className="text-right text-muted">
                <small>{moment(notification.createdAt).format("LLLL")}</small>
              </div>
            </div>
            <p className="text-sm mb-0">{notification.description}</p>
          </div>
        </Row>
      </ListGroupItem>
    ));
  };

  return (
    <div className="userNotifications mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Notifications</title>
        <meta name="description" content="Description of User Notifications" />
      </Helmet>
      <Row className="mt-3">
        <Col className="text-lg">
          You have <strong className="text-info">{unreadNotifications}</strong>{" "}
          {unreadNotifications == 0 || unreadNotifications == 1
            ? "new notification."
            : "new notifications."}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ListGroup>{getNotifications()}</ListGroup>
        </Col>
      </Row>
    </div>
  );
}

UserNotifications.propTypes = {};
