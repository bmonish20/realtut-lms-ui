import {UPDATE_ACTIVITY_LIST } from "./constants";
import {getActivities} from "./activityFeedApi";

export const fetchActivities = () =>{
  return async (dispatch) =>{
    try{
      const {data} = await getActivities();
      dispatch(updateActivityList(data)); 
    }catch(err){
      dispatch(updateActivityList());
    }
  }
}

const updateActivityList = (payload=[])=>({
  type: UPDATE_ACTIVITY_LIST,
  payload,
})