import Request from "utils/request";

export const addEventApi = async (eventDetails) => {
  return await Request({
    url: "/api/event",
    method: "POST",
    data: eventDetails,
  });
};

export const editEventApi = async (id, eventDetails) => {
  return await Request({
    url: `/api/event/${id}`,
    method: "PATCH",
    data: eventDetails
  });
}
