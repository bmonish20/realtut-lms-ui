import Request from "utils/request";

export const addArticle = async article => {
  return await Request({
    url: "/api/article",
    method: "POST",
    data: article
  });
};

export const editArticle = async (id, article) => {
  return await Request({
    url: `/api/article/${id}`,
    method: "PATCH",
    data: article,
  });
};

export const getCategories = async () => {
  return await Request({
    url: "/api/article/category",
    method: "GET",
  });
}

export const uploadFileApi = async (id, formData) => { 
  return await Request({
    url: `/api/file/upload/article/${id}`,
    method: "POST",
    data: formData,
  });
};