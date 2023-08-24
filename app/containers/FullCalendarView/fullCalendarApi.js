import Request from "utils/request";

const fields = "title,type,dateTime,shortDescription,hostedBy,imageUrl";

export const fetchUpcomingEvents = async (date) => {
  return await Request({
    url: `/api/dashboard/events?startDate=${date}&perPage=${30}&fields=${fields}`,
    method: "GET",
  }).then(({ data }) => data);
};

export const fetchCoursesApi = async () => {
  return await Request({
    url: "/api/course/my",
    method: "GET",
  });
};
