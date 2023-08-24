import _get from "lodash/get";
import {
  REVIEW_PAGE_INIT,
  REVIEW_PAGE_SET_LOADING,
  REVIEW_PAGE_SET_DETAILS,
  REVIEW_PAGE_CHANGE_MARK,
  REVIEW_PAGE_VALIDATION_ERROR,
  REVIEW_PAGE_CHANGE_COMMENT,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { fetchReviewDetails } from "../Reviews/reviewsApi";
import history from "utils/history";
import schema from "./validations";
import { addReview } from "./reviewApi";

export const fetchReview = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchReviewDetails(id);
      dispatch(updateReviewDetails(data));
    } catch (err) {
      dispatch(updateReviewDetails());
    }
  };
};

export const onSubmit = (id, reviewDetails, questions) => {
  return async (dispatch) => {
    try {
      const isValid = schema.isValidSync(reviewDetails);
      if (!isValid) {
        const error = await schema.validate(reviewDetails).catch((err) => err);
        dispatch(validationFailed(error));
        return;
      }
      dispatch(showLoading(true));
      var userScore = 0;
      var totalScore = 0;
      reviewDetails.response.map((response) => {
        userScore = userScore + parseInt(response.mark);
      });
      questions.map(({ points }) => {
        totalScore = totalScore + parseInt(points);
      });
      await addReview(id, { ...reviewDetails, userScore, totalScore });
      NotificationHandler.open({
        operation: "success",
        title: "Review added successfully",
      });
      history.goBack();
    } catch (err) {
      dispatch(showLoading(false));
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to add review",
      });
    }
  };
};

const validationFailed = (payload) => ({
  type: REVIEW_PAGE_VALIDATION_ERROR,
  payload,
});

const updateReviewDetails = (payload) => ({
  type: REVIEW_PAGE_SET_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: REVIEW_PAGE_SET_LOADING,
  payload,
});

export const reviewPageInit = () => ({
  type: REVIEW_PAGE_INIT,
});

export const changeMark = (payload, index) => ({
  type: REVIEW_PAGE_CHANGE_MARK,
  payload,
  index,
});

export const changeComment = (payload, index) => ({
  type: REVIEW_PAGE_CHANGE_COMMENT,
  payload,
  index,
});
