import Request from "utils/request";

export const getQuizzes = async () => {
  return await Request({
    url: "/api/quiz",
    method: "GET",
  });
};

export const fetchScore = async (quizId, userId) => {
  return await Request({
    url: `/api/quizResponses/score?quizId=${quizId}&userId=${userId}`,
    method: "GET",
  });
};

export const getMyQuizzes = async () => {
  return await Request({
    url: "/api/quiz/my",
    method: "GET",
  });
};

export const addQuiz = async (quizDetails) => {
  return await Request({
    url: "/api/quiz",
    method: "POST",
    data: quizDetails,
  });
};

export const deleteQuiz = async (id) => {
  return await Request({
    url: `/api/quiz/${id}`,
    method: "DELETE",
  });
};

export const fetchQuizDetails = async (id) => {
  return await Request({
    url: `/api/quiz/${id}`,
    method: "GET",
  });
};

export const editQuizApi = async (id, quizDetails) => {
  return await Request({
    url: `/api/quiz/${id}`,
    method: "PATCH",
    data: quizDetails,
  });
};
