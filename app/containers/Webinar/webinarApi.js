import Request from 'utils/request';

export const fetchWebinarDetails = async (id) => {
  return await Request({
    url: `/api/event/${id}`,
    method: 'GET'
  });
}

export const registerToEvent = async (id) => {
  return await Request({
    url: `/api/event/${id}/register`,
    method: 'POST'
  });
}

export const removeRegistration = async (id) => {
  return await Request({
    url: `/api/event/${id}/register`,
    method: 'DELETE'
  });
}