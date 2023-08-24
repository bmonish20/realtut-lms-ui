import Request from "utils/request";

export const addLessonApi = async (details) => {
  return await Request({
    url: "/api/chapter",
    method: "POST",
    data: details
  });
}

export const fetchLessonApi = async (id) => {
  return await Request({
    url: `/api/chapter/${id}`,
    method: "GET",
  });
}

export const updateLessonApi = async (id, details) => {
  return await Request({
    url: `/api/chapter/${id}`,
    method: "PATCH",
    data: details
  });
}