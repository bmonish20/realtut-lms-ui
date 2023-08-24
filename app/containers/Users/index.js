/**
 *
 * Users
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Button, Table, Label, Input } from "reactstrap";
import Select from "react-select";
import Can from "../../components/Can";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import InviteUser from "../InviteUser";
import { permissions } from "utils/permissions";
import history from "utils/history";
import reducer from "./reducer";
import _get from "lodash/get";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./usersStyle.scss";
import { debounce } from "lodash";

export default function Users() {
  useInjectReducer({ key: "usersPage", reducer });
  const dispatch = useDispatch();
  const changeFilter = operations.changeFilter(dispatch);
  const changeSearch = operations.changeSearch(dispatch);
  const { isLoading, users, role } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    users: selectors.users(state),
    role: selectors.role(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchUsers());
  }, []);

  const onRoleSelect = (e) => {
    changeFilter(e);
    dispatch(operations.fetchSpecificType(_get(e, "value", null)));
  };

  const searchInputChanged = (e) => {
    e.persist();
    delayedSearch(e.target.value);
  };

  const searchPattern = (e) => {
    if (e == "") {
      e = "null";
    }
    dispatch(operations.searchUserList(e));
  };

  const delayedSearch = debounce(searchPattern, 2000);

  const onEdit = (id) => {
    history.push(`/edit-user?id=${id}`);
  };

  const onEnable = (id, userDetails) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.disableUser(id, userDetails)),
      confirmBtnText: "Enable",
      text: `You are about to enable this user. Do you want to continue?`,
      data: {},
      success: true,
      customClass: "text-xs",
      btnSize: "sm",
      confirmBtnBsStyle: "success",
      cancelBtnBsStyle: "outline-sucess",
    });
  };

  const onDisable = (id, userDetails) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.disableUser(id, userDetails)),
      confirmBtnText: "Disable",
      text: `You are about to disable this user. Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onInviteUser = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: InviteUser,
      ChildProps: {},
      showConfirm: false,
      showCancel: false,
    });
  };

  const getTableData = () => {
    return users.map((user) => (
      <React.Fragment key={user.id}>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.role}</td>
          <td>
            <Button
              type="button"
              color="primary"
              size="sm"
              onClick={(e) => onEdit(user.id)}
            >
              <span className="btn-inner--icon">
                <i className="far fa-edit" />
              </span>
            </Button>
            {!user.enabled ? (
              <Button
                type="button"
                color="danger"
                size="sm"
                onClick={(e) => onEnable(user.id, { enabled: true })}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-lock" />
                </span>
              </Button>
            ) : (
              <Button
                type="button"
                color="success"
                size="sm"
                onClick={(e) => onDisable(user.id, { enabled: false })}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-lock-open" />
                </span>
              </Button>
            )}
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <Can permissions={[permissions.VIEW_USERS]}>
      <div className="users mx-3 mx-md-4 ml-lg-7">
        <Helmet>
          <title>Users</title>
          <meta name="description" content="Users List Page" />
        </Helmet>
        <Row className="mt-3 mb-4 align-items-center">
          <Label for="summary" sm="2" className="text-left">
            Show User Types
          </Label>
          <Col sm={3}>
            <Select
              onChange={(e) => onRoleSelect(e)}
              isClearable={true}
              name="role"
              value={role}
              options={[
                { value: "user", label: "User" },
                { value: "trainer", label: "Trainer" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </Col>
          <Label
            for="summary"
            sm="2"
            className="text-left ml-auto text-lg-right"
          >
            Search
          </Label>
          <Col sm="6" md="3">
            <Input
              onChange={(e) => searchInputChanged(e)}
              type="text"
              placeholder="Enter your search term..."
              name="searchString"
            />
          </Col>
          <Col className="text-right ml-auto">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={onInviteUser}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Invite User</span>
            </Button>
          </Col>
        </Row>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getTableData()}</tbody>
        </Table>
      </div>
    </Can>
  );
}

Users.propTypes = {};
