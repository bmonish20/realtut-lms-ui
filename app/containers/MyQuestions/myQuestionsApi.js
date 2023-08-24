import Request from "utils/request";

export const getQuestions = async () => {
  return await Request({
    url: "/api/question",
    method: "GET",
  });
};

export const deleteQuestion = async (id) => {
  return await Request({
    url: `/api/question/${id}`,
    method: "DELETE",
  });
};
