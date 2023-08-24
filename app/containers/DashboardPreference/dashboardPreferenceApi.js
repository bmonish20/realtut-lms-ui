import Request from "utils/request";

export const changePreference = async (userId, details) => {
  return await Request({
    url: `/api/user/${userId}`,
    method: "PATCH",
    data: details,
  });
};

export const fetchPreference = async (id) => {
  return await Request({
    url: `/api/user/${id}`,
    method: "GET",
  });
};
