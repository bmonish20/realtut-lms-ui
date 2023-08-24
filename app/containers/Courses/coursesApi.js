import Request from "utils/request";

export const getCourses = async (date) => {
  return await Request({
    url: `/api/courses?date=${date}`,
    method: "GET",
  });
};

export const getPastCourses = async (date) => {
  return await Request({
    url: `/api/courses/past?endDate=${date}`,
    method: "GET",
  });
};

export const deleteCourse = async (id) => {
  return await Request({
    url: `/api/course/${id}`,
    method: "DELETE",
  });
};
