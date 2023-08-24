import Request from "utils/request";

export const getMyCourses = async (date, userId) => {
  return await Request({
    url: `/api/courses/trainer?date=${date}&userId=${userId}`,
    method: "GET",
  });
};

export const getMyPastCourses = async (date, userId) => {
  return await Request({
    url: `/api/courses/trainer/past?date=${date}&userId=${userId}`,
    method: "GET",
  });
};

export const deleteCourse = async (id) => {
  return await Request({
    url: `/api/course/${id}`,
    method: "DELETE",
  });
};
