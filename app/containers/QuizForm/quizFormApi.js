import Request from "utils/request";

export const fetchQuizDetails = async (id) => {
  return await Request({
    url: `/api/quiz/${id}`,
    method: "GET",
  });
};

export const addResponse = async (quizAnswerDetails) => {
  return await Request({
    url: `/api/quizResponses`,
    method: "POST",
    data: quizAnswerDetails,
  });
};
