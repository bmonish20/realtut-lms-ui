import Request from "utils/request";

export const addReview = async (id, reviewDetails) => {
  return await Request({
    url: `/api/quizResponses/${id}`,
    method: "PATCH",
    data: reviewDetails,
  });
};
