import Request from "utils/request";

export const downloadFile = async (fileId) => {
  return await Request({
    url: `/api/file/download/task/${fileId}`,
    method: "GET",
  });
};
