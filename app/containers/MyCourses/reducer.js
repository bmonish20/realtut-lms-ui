/*
 *
 * MyCourses reducer
 *
 */
import produce from "immer";
import { SET_COURSES, SET_LOADING } from "./constants";

export const initialState = {
  courses: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const myCoursesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COURSES: draft.courses = action.payload;
        break;
      case SET_LOADING: draft.isLoading = action.payload;
        break;
    }
  });

export default myCoursesReducer;
