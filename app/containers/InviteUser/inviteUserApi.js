import Request from "utils/request";

export const sendInvite = async (userDetails) => {
  return await Request({
    url: "/api/auth/register-via-invite",
    method: "POST",
    data: userDetails,
  });
};
