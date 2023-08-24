import Request from "utils/request";

export const fetchCoursesApi = async () => {
  return await Request({
    url: '/api/course/my',
    method: 'GET'
  });
}