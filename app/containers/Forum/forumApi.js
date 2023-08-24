import Request from "utils/request";

export const sendForumMessage = async (messageDetails) => {
  return await Request({
    url: "/api/forum",
    method: "POST",
    data: messageDetails,
  });
};

export const fetchForumMessages = async (courseId, page) => {
  return await Request({
    url: `/api/forum/all?courseId=${courseId}&page=${page}`,
    method: "GET",
  });
};
