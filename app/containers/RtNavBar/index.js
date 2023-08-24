/**
 *
 * RtNavBar
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { useCookies } from "react-cookie";
import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import _get from "lodash/get";
import history from "utils/history";
import reducer from "./reducer";
import moment from "moment-timezone";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./rtNavBarStyle.scss";

const getName = (cookie) => _get(cookie, "user.name", "User");

export default function RtNavBar({
  sidenavOpen,
  toggleSidenav,
  profilePicture,
}) {
  useInjectReducer({ key: "rtNavBar", reducer });
  const dispatch = useDispatch();
  const { notifications, unreadNotifications } = useSelector((state) => ({
    notifications: selectors.notifications(state),
    unreadNotifications: selectors.unreadNotifications(state),
  }));
  const [cookie] = useCookies(["user"]);

  const redirectToProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

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
                <small>
                  {moment(notification.createdAt).format("LT, DD MMM")}
                </small>
              </div>
            </div>
            <p className="text-sm mb-0">{notification.description}</p>
          </div>
        </Row>
      </ListGroupItem>
    ));
  };

  return (
    <>
      <Navbar className="navbar-top navbar-expand border-bottom">
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="text-left my-1 pl-2" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    "sidenav-toggler-dark"
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-right ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link my-1" color="" tag="a">
                  <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-xl py-0 overflow-hidden"
                  right
                >
                  <div className="px-3 py-3 d-flex justify-content-between">
                    <h6 className="text-sm text-muted m-0">
                      You have{" "}
                      <strong className="text-info">
                        {unreadNotifications}
                      </strong>{" "}
                      {unreadNotifications == 0 || unreadNotifications == 1
                        ? "new notification."
                        : "new notifications."}
                    </h6>
                    <h6
                      className="text-sm text-muted text-right m-0 hover-pointer text-underline"
                      onClick={(e) => history.push("/notifications")}
                    >
                      View All
                    </h6>
                  </div>
                  <ListGroup flush>{getNotifications()}</ListGroup>
                </DropdownMenu>
              </UncontrolledDropdown>
              <span className="py-2 mx-3 text-primary font-weight-bold">
                {getName(cookie)}
              </span>
              {profilePicture ? (
                <a
                  className="avatar avatar-sm rounded-circle"
                  href="#pablo"
                  onClick={redirectToProfile}
                >
                  <img alt="..." src={profilePicture} />
                </a>
              ) : (
                <i
                  className="ni ni-circle-08 text-primary hover-pointer text-xl pt-2"
                  onClick={redirectToProfile}
                />
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

RtNavBar.propTypes = {};
