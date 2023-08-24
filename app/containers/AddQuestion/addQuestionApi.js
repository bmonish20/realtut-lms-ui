import Request from "utils/request";

export const addQuestion = async (questionDetails) => {
  return await Request({
    url: "/api/question",
    method: "POST",
    data: questionDetails,
  });
};

export const editQuestionApi = async (id, questionDetails) => {
  return await Request({
    url: `/api/question/${id}`,
    method: "PATCH",
    data: questionDetails,
  });
};

export const getQuestions = async () => {
  return await Request({
    url: "/api/question",
    method: "GET",
  });
};

export const fetchQuestionDetails = async (id) => {
  return await Request({
    url: `/api/question/${id}`,
    method: "GET",
  });
};

export const deleteQuestion = async (id) => {
  return await Request({
    url: `/api/question/${id}`,
    method: "DELETE",
  });
};
