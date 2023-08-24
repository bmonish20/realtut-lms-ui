import Request from "utils/request";

export const loginUser = async (userDetails) => {
  return await Request({
    url: "/api/auth/login",
    method: "POST",
    data: userDetails,
  });
};

export const OAuthLogin = async (loginType, token) => {
  return await Request({
    url: `/api/auth/login/${loginType}`,
    method: "POST",
    data: { "access_token": token },
  });
};

export const getOAuthConfig = async () => {
  return await Request({
    url: "/api/auth/config",
    method: "GET"
  });
}