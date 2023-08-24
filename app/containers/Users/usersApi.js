import Request from "utils/request";

export const getUsers = async () => {
  return await Request({
    url: "/api/user",
    method: "GET",
  });
};

export const fetchUserDetails = async (id) => {
  return await Request({
    url: `/api/user/${id}`,
    method: "GET",
  });
};

export const fetchSpecificRole = async (role) => {
  return await Request({
    url: `/api/user?role=${role}`,
    method: "GET",
  });
};

export const searchUsers = async (searchString) => {
  return await Request({
    url: `/api/user?searchPattern=${searchString}`,
    method: "GET",
  });
};
