import Request from "utils/request";

export const getReviews = async (quizId) => {
  return await Request({
    url: `/api/quizResponses/quiz/${quizId}`,
    method: "GET",
  });
};

export const deleteReview = async (id, quizId) => {
  return await Request({
    url: `/api/quizResponses/${id}`,
    method: "DELETE",
    data : quizId,
  });
};

export const fetchReviewDetails = async (id) => {
  return await Request({
    url: `/api/quizResponses/${id}`,
    method: "GET",
  });
};
