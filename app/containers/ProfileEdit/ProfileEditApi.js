import Request from "utils/request";

export const uploadFile = async (formData,email) => { 
  return await Request({
    url: `/api/file/upload/profile/${email}`,
    method: "POST",
    data: formData,
  });
};

export const downloadFile = async (email) => { 
  return await Request({
    url: `/api/file/download/profile/${email}`,
    method: "GET"    
  });
};

export const FetchUserDetails = async(userId) => {
  return await Request({
    url: `/api/user/${userId}`,
    method: "GET",
  });
}


export const UpdateUserDetails = async(userId,payload) => {
  
  return await Request({
    url: `/api/user/${userId}`,
    method: "PATCH",
    data: payload
  });
}