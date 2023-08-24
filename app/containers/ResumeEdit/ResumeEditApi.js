
import Request from "utils/request";

export const uploadFile = async (formData,email) => { 
  return await Request({
    url: `/api/file/upload/resume/${email}`,
    method: "POST",
    data: formData,
  });
};

export const downloadFile = async (email) => { 
  return await Request({
    url: `/api/file/upload/resume/${email}`,
    method: "GET",    
  });
};