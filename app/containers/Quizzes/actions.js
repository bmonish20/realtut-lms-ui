import _get from "lodash/get";
import { UPDATE_QUIZ_LIST, QUIZ_PAGE_SET_LOADING } from "./constants";
import { getQuizzes, deleteQuiz, getMyQuizzes, fetchScore } from "./quizzesApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchMyQuizzes = () => {
  return async (dispatch) => {
    try {
      const { data } = await getMyQuizzes();
      dispatch(updateQuizList(data));
    } catch (err) {
      dispatch(updateQuizList());
    }
  };
};

const fetchScoreDetails = async (quiz, userId) => {
  try {
    const {
      data: [{ id, response }],
    } = await fetchScore(quiz.id, userId);
    quiz["quizResponseId"] = id;
    var totalScore = 0;
    response.map((question) => {
      totalScore = totalScore + parseInt(question.mark);
    });

    if (totalScore) {
      quiz["totalScore"] = totalScore;
    } else {
      quiz["totalScore"] = 0;
    }
  } catch (err) {
    console.log("Error", err);
  }
};

export const fetchQuizzes = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await getQuizzes();
      for (var i = 0; i < data.length; i++) {
        await fetchScoreDetails(data[i], userId);
      }
      dispatch(updateQuizList(data));
    } catch (err) {
      dispatch(updateQuizList());
    }
  };
};

export const deleteOneQuiz = (id, quizName) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteQuiz(id);
      NotificationHandler.open({
        operation: "success",
        message: `${quizName} was deleted`,
        title: "Quiz deleted successfully",
      });
      dispatch(fetchQuizzes());
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Quiz",
      });
      dispatch(setLoading(false));
    }
  };
};
const setLoading = (payload) => ({
  type: QUIZ_PAGE_SET_LOADING,
  payload,
});

const updateQuizList = (payload = []) => ({
  type: UPDATE_QUIZ_LIST,
  payload,
});
