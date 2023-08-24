/*
 *
 * TrainerCourses reducer
 *
 */
import produce from "immer";
import {
  SET_COURSES,
  SET_LOADING,
  SET_COURSE_PAGE_TYPE,
  NEW_COURSES,
} from "./constants";

export const initialState = {
  isLoading: true,
  courses: [],
  coursePageType: NEW_COURSES,
};

/* eslint-disable default-case, no-param-reassign */
const trainerCoursesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_COURSES: {
        draft.isLoading = false;
        draft.courses = action.payload;
        break;
      }
      case SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case SET_COURSE_PAGE_TYPE:
        draft.coursePageType = action.payload;
        break;
    }
  });

export default trainerCoursesReducer;
