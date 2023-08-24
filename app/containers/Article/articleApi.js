import Request from "utils/request";

export const fetchArticleDetails = async (id) => {
  return await Request({
    url: `/api/article/${id}`,
    method: 'GET'
  });
}