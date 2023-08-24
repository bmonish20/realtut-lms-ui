import Request from "utils/request";

export const editUserApi = async (id, userDetails) => {
  return await Request({
    url: `/api/user/${id}`,
    method: "PATCH",
    data: userDetails,
  });
};
