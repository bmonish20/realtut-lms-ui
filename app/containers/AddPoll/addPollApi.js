import Request from "utils/request";

export const addPoll = async (pollDetails) => {
  return await Request({
    url: "/api/poll",
    method: "POST",
    data: pollDetails,
  });
};

export const updatePoll = async (pollId, options) => {
  return await Request({
    url: `/api/poll/${pollId}`,
    method: "PATCH",
    data: options,
  });
};
