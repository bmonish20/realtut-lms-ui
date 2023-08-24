import Request from 'utils/request';
const fields = "title,type,dateTime,shortDescription,hostedBy,imageUrl";

export const fetchUpcomingEvents = async (date) => {
  return await Request({
    url: `/api/dashboard/events?startDate=${date}&perPage=${30}&fields=${fields}`,
    method: "GET"
  });
}

export const fetchPastEvents = async (date) => {
  return await Request({
    url: `/api/event/past?endDate=${date}&perPage=${30}&fields=${fields}`,
    method: "GET"
  });
}

export const getWebinars = async () => {
  return await Request({
  url: '/api/event',   
  method: 'GET'});
}

export const deleteWebinar = async (id) => {
  return await Request({
    url: `/api/event/${id}`,
    method: 'DELETE'
  });
}