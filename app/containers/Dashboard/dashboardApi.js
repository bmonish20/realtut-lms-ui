import Request from "utils/request";

const fields = "title,type,dateTime,shortDescription,hostedBy,imageUrl";

export const fetchUpcomingEvents = async (date) => {
  return await Request({
    url: `/api/dashboard/events?startDate=${date}&perPage=${2}&fields=${fields}`,
    method: "GET",
  }).then(({ data }) => data);
};

export const getTasks = async (date) => {
  return await Request({
    url: "/api/dashboard/task",
    method: "GET",
  });
};

export const fetchSpecificEvent = async (startDate, endDate) => {
  return await Request({
    url: `/api/event/date?startDate=${startDate}&endDate=${endDate}`,
    method: "GET",
  }).then(({ data }) => data);
};

export const downloadFile = async (email) => {
  return await Request({
    url: `/api/file/download/profile/${email}`,
    method: "GET",
  });
};

export const fetchCourseProgress = async () => {
  return await Request({
    url: "/api/course/my",
    method: "GET",
  });
};

export const getCourses = async (date) => {
  return await Request({
    url: `/api/courses?date=${date}`,
    method: "GET",
  });
};

export const getActivityFeed = async () => {
  return await Request({
    url: "/api/dashboard/activity",
    method: "GET",
  });
};
