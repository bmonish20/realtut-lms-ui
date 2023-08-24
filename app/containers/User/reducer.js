/*
 *
 * User reducer
 *
 */
import produce from "immer";
import { UPDATE_USER_DETAILS, USER_PAGE_SET_LOADING} from "./constants";

export const initialState = {
  isloading:true,
  user:{},
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USER_DETAILS:{
        draft.user=action.payload;
        draft.isloading=false;
        break;
      }
      case USER_PAGE_SET_LOADING:
        draft.isloading=action.payload;
        break;
    }
  });

export default userReducer;
