/*
 *
 * MyQuestions actions
 *
 */
import _get from "lodash/get";
import { UPDATE_QUESTION_LIST, QUESTION_PAGE_SET_LOADING } from "./constants";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import { getQuestions, deleteQuestion } from "./myQuestionsApi";

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const { data } = await getQuestions();
      dispatch(updateQuestionList(data));
    } catch (err) {
      dispatch(updateQuestionList());
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Questions",
      });
      dispatch(setLoading(false));
    }
  };
};

export const onDelete = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteQuestion(id);
      dispatch(fetchQuestions());
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete Question",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const setLoading = (payload) => ({
  type: QUESTION_PAGE_SET_LOADING,
  payload,
});

const updateQuestionList = (payload = []) => ({
  type: UPDATE_QUESTION_LIST,
  payload,
});
