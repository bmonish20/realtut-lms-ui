/*
 *
 * User actions
 *
 */
import _get from "lodash/get";
import { UPDATE_USER_DETAILS, USER_PAGE_SET_LOADING } from "./constants";
import {fetchUserDetails} from './userApi';
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export function fetchUser(id) {
  return async(dispatch)=> {
    try {
      dispatch(showLoading(true))
      const {data} = await fetchUserDetails(id);
      dispatch(updateUserDetails(data));
      dispatch(showLoading(false))
    }catch(err){
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to update user details",
      });
      dispatch(showLoading(false))
      dispatch(updateUserDetails());
    }
  };
};

const showLoading = (payload) => ({
  type: USER_PAGE_SET_LOADING,
  payload,
});

const updateUserDetails= (payload) => ({
  type: UPDATE_USER_DETAILS,
  payload,
});