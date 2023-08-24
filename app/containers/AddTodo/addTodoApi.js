import Request from "utils/request";

export const addTodoApi = async (todoDetails) => {
  return await Request({
    url: "/api/todo",
    method: "POST",
    data: todoDetails,
  });
};

export const editTodoApi = async (id, todoDetails) => {
  return await Request({
    url: `/api/todo/${id}`,
    method: "PATCH",
    data: todoDetails,
  });
};

export const fetchTodoDetails = async (id) => {
  return await Request({
    url: `/api/todo/${id}`,
    method: "GET",
  });
};
