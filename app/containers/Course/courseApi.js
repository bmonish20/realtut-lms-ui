import Request from "utils/request";

export const fetchCourseDetails = async (id) => {
  return await Request({
    url: `/api/course/${id}`,
    method: "GET",
  });
};

export const registerToCourse = async (id) => {
  return await Request({
    url: `/api/course/${id}/register`,
    method: "POST",
  });
};

export const removeRegistration = async (id) => {
  return await Request({
    url: `/api/course/${id}/register`,
    method: "DELETE",
  });
};

export const reviewCourse = async (id, rating) => {
  return await Request({
    url: `/api/course/${id}/review`,
    method: "POST",
    data: { rating },
  });
};

export const updateReview = async (courseReviewId, rating) => {
  return await Request({
    url: `/api/course/${courseReviewId}/review`,
    method: "PATCH",
    data: { rating },
  });
};

export const getPollDetails = async (courseId) => {
  return await Request({
    url: `/api/poll?courseId=${courseId}&perPage=1`,
    method: "GET",
  });
};
