/*
 *
 * Users actions
 *
 */

import _get from "lodash/get";
import {
  UPDATE_USER_LIST,
  USERS_PAGE_SET_LOADING,
  USERS_PAGE_CHANGE_FILTER,
  USERS_PAGE_CHANGE_SEARCH,
} from "./constants";
import { getUsers, fetchSpecificRole, searchUsers } from "./usersApi";
import { editUserApi } from "../EditUser/editUserApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchSpecificType = (role) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchSpecificRole(role);
      dispatch(updateUserList(data));
    } catch (err) {
      dispatch(updateUserList());
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await getUsers();
      dispatch(updateUserList(data));
    } catch (err) {
      dispatch(updateUserList());
    }
  };
};

export const disableUser = (id, userDetails) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      await editUserApi(id, userDetails);
      NotificationHandler.open({
        operation: "success",
        title: "User status changed successfully",
      });
      const { data } = await getUsers();
      dispatch(updateUserList(data));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to change the status of the user",
      });
    }
  };
};

export const searchUserList = (searchString) => {
  return async (dispatch) => {
    try {
      const { data } = await searchUsers(searchString);
      dispatch(updateUserList(data));
    } catch (err) {
      dispatch(updateUserList());
    }
  };
};

const setLoading = (payload) => ({
  type: USERS_PAGE_SET_LOADING,
  payload,
});

const updateUserList = (payload = []) => ({
  type: UPDATE_USER_LIST,
  payload,
});

export const changeFilter = (dispatch) => (payload) => {
  dispatch({ type: USERS_PAGE_CHANGE_FILTER, payload });
};

export const changeSearch = (dispatch) => (payload) => {
  dispatch({ type: USERS_PAGE_CHANGE_SEARCH, payload });
};
