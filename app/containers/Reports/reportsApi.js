import Request from "utils/request";

export const getCourseRatings = async () => {
  return await Request({
    url: "/api/reviews",
    method: "GET",
  });
};

export const getStudentProgress = async () => {
  return await Request({
    url: "/api/course/registrations/all",
    method: "GET",
  });
};

export const getStudentAssessment = async () => {
  return await Request({
    url: "/api/quizResponses/all",
    method: "GET",
  });
};

export const getMonthlyStudent = async () => {
  return await Request({
    url: "/api/courses/all",
    method: "GET",
  });
};

export const getUserQuizResponses = async (userId) => {
  return await Request({
    url: `/api/quizResponses?attendedBy=${userId}`,
    method: "GET",
  });
};

export const getQuizScore = async (quizId, userId) => {
  return await Request({
    url: `/api/quizResponses/score?quizId=${quizId}&userId=${userId}`,
    method: "GET",
  });
};
