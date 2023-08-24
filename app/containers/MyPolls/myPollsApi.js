import Request from "utils/request";

export const getMyPolls = async () => {
  return await Request({
    url: "/api/poll/my",
    method: "GET",
  });
};
