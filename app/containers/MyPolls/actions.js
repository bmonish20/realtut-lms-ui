import { SET_POLLS, MY_POLLS_SET_LOADING } from "./constants";
import { getMyPolls } from "./myPollsApi";
import _get from "lodash/get";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchMyPolls = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(true));
      const { data } = await getMyPolls();
      dispatch(setPollList(data));
    } catch (err) {
      dispatch(setPollList());
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch poll details",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: MY_POLLS_SET_LOADING,
  payload,
});

const setPollList = (payload) => ({
  type: SET_POLLS,
  payload,
});
