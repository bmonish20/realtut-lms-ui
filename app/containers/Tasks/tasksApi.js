import Request from "utils/request";

export const getTasks = async (page) => {
  return await Request({
    url: `/api/task?page=${page}`,
    method: "GET",
  });
};

export const fetchTaskDetails = async (id) => {
  return await Request({
    url: `/api/task/${id}`,
    method: "GET",
  });
};

export const deleteTask = async (id) => {
  return await Request({
    url: `/api/task/${id}`,
    method: "DELETE",
  });
};

export const fetchSpecificStatus = async (status, page) => {
  return await Request({
    url: `/api/task?status=${status}&page=${page}`,
    method: "GET",
  });
};
