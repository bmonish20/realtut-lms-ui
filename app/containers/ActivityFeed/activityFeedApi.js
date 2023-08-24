import Request from "utils/request";

export const getActivities = async() =>{
    return await Request({
        url: "/api/activityFeed",
        method: "GET",
    });
};