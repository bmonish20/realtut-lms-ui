import Request from "utils/request";

export const getTodos = async () => {
  return await Request({
    url: "/api/todo",
    method: "GET",
  });
};

export const deleteTodo = async (id) => {
  return await Request({
    url: `/api/todo/${id}`,
    method: "DELETE",
  });
};
