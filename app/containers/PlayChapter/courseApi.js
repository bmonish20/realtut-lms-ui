import Request from "utils/request";

export const setCourseProgress = (id, courseProgress) => {
  return Request({
    url: `/api/course/${id}/progress`,
    data: { courseProgress },
    method: "POST",
  });
};

export const fetchScore = (quizId, userId) => {
  return Request({
    url: `/api/quizResponses/score?quizId=${quizId}&userId=${userId}`,
    method: "GET",
  });
};
