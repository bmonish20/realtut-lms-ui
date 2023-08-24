import Request from "utils/request";

export const fetchUserDetails = async (id) => {
    return await Request({
      url: `/api/user/${id}`,
      method: "GET",
    });
  };