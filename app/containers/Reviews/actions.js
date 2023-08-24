import _get from "lodash/get";
import { UPDATE_REVIEW_LIST, REVIEW_PAGE_SET_LOADING } from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { getReviews, deleteReview } from "./reviewsApi";

export const fetchReviews = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await getReviews(id);
      dispatch(updateReviewList(data));
    } catch (err) {
      dispatch(updateReviewList());
    }
  };
};

export const deleteOneReview = (id, quizId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteReview(id, {quizId});
      NotificationHandler.open({
        operation: "success",
        title: "Review deleted successfully",
      });
      dispatch(fetchReviews(quizId));
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Review",
      });
      dispatch(setLoading(false));
    }
  };
};

const setLoading = (payload) => ({
  type: REVIEW_PAGE_SET_LOADING,
  payload,
});

const updateReviewList = (payload = []) => ({
  type: UPDATE_REVIEW_LIST,
  payload,
});
