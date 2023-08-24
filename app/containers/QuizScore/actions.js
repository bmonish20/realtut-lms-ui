import _get from "lodash/get";
import {
  SCORE_PAGE_SET_LOADING,
  SCORE_PAGE_INIT,
  SCORE_PAGE_SET_DETAILS,
} from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { fetchReviewDetails } from "./quizScoreApi";

export const fetchReview = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchReviewDetails(id);
      var totalScore = 0;
      data.response.map((question) => {
        totalScore = totalScore + parseInt(question.mark);
      });
      if (totalScore) {
        data["totalScore"] = totalScore;
      } else {
        data["totalScore"] = 0;
      }
      dispatch(updateResponseDetails(data));
    } catch (err) {
      dispatch(updateResponseDetails());
    }
  };
};

const updateResponseDetails = (payload) => ({
  type: SCORE_PAGE_SET_DETAILS,
  payload,
});

const showLoading = (payload) => ({
  type: SCORE_PAGE_SET_LOADING,
  payload,
});

export const quizScorePageInit = () => ({
  type: SCORE_PAGE_INIT,
});
