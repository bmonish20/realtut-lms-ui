import Request from "utils/request";

const chapterFields = "id,title";

export const addCourseApi = async (courseDetails) => {
  return await Request({
    url: "/api/course",
    method: "POST",
    data: courseDetails,
  });
};

export const editCourseApi = async (id, courseDetails) => {
  return await Request({
    url: `/api/course/${id}`,
    method: "PATCH",
    data: courseDetails,
  });
};

export const fetchChaptersApi = async () => {
  return await Request({
    url: `api/chapter/all?fields=${chapterFields}&perPage=30`,
    method: "GET",
  });
};

export const fetchQuizzesApi = async () => {
  return await Request({
    url: "/api/quiz",
    method: "GET",
  });
};

export const uploadFileApi = async (id, formData) => {
  return await Request({
    url: `/api/file/upload/course/${id}`,
    method: "POST",
    data: formData,
  });
};
