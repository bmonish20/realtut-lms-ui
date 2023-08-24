import Request from 'utils/request';
import { ALL_PUBLICATION, MY_PUBLICATION, MY_DRATS, ALL_CATEGORIES } from "./constants";

const fields = "id,title,category,description,hostedBy,createdAt,readDurationInMins";

const getFilters = (articleType, userId, category) => {
  let filters = '';
  switch(articleType) {
    case ALL_PUBLICATION:
      filters = `${filters}&isDraft=${false}`;
      break;
    case MY_PUBLICATION:
      filters = `${filters}&writtenBy=${userId}&isDraft=${false}`;
      break;
    case MY_DRATS:
      filters = `${filters}&writtenBy=${userId}&isDraft=${true}`;
      break;
  }
  switch(category) {
    case ALL_CATEGORIES:
      break;
    default:
      filters = `${filters}&category=${category}`;
  }

  return filters;
}

export const getArticles = async (articleType, userId, category) => {
  return await Request({
    url: `/api/article?fields=${fields}${getFilters(articleType, userId, category)}`,
    method: 'GET'
  });
}

export const deleteArticle = async id => {
  return await Request({
    url: `/api/article/${id}`,
    method: 'DELETE'
  });
}

export const likeArticle = async id => {
  return await Request({
    url: `/api/article/${id}/like`,
    method: 'POST'
  });
}

export const unLikeArticle = async id => {
  return await Request({
    url: `/api/article/${id}/like`,
    method: 'DELETE'
  });
}

export const getCategories = async () => {
  return await Request({
    url: "/api/article/category",
    method: "GET",
  });
}
