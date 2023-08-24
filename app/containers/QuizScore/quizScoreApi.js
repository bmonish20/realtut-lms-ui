import Request from "utils/request";

export const fetchReviewDetails = async (id) => {
  return await Request({
    url: `/api/quizResponses/${id}`,
    method: "GET",
  });
};
