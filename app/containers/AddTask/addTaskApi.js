import Request from "utils/request";

export const addTaskApi = async (taskDetails) => {
  return await Request({
    url: "/api/task",
    method: "POST",
    data: taskDetails,
  });
};

export const editTaskApi = async (id, taskDetails) => {
  return await Request({
    url: `/api/task/${id}`,
    method: "PATCH",
    data: taskDetails,
  });
};

export const getUsers = async () => {
  return await Request({
    url: "/api/user?enabled=true",
    method: "GET",
  });
};

export const uploadFile = async (formData, email) => {
  return await Request({
    url: `/api/file/upload/task/${email}`,
    method: "POST",
    data: formData,
  });
};

export const deleteFile = async (key) => {
  return await Request({
    url: `/api/file/delete/task/${key}`,
    method: "DELETE",
  });
};

export const downloadFile = async (fileId) => {
  return await Request({
    url: `/api/file/download/task/${fileId}`,
    method: "GET",
  });
};
