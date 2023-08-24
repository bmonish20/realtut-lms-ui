import Request from "utils/request";

export const fetchChaptersApi = async () => {
  return await Request({
    url: '/api/chapter/my',
    method: 'GET'
  });
}

export const deleteChapterApi = async (id) => {
  return await Request({
    url: `/api/chapter/${id}`,
    method: 'DELETE'
  });
}