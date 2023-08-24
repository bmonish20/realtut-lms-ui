import * as operations from "./actions";
import { NEW_COURSES, PAST_COURSES } from "./constants";

export const dropdownOptions = (dispatch, userId) => [
  {
    text: NEW_COURSES,
    onClick: () => dispatch(operations.fetchCourses(NEW_COURSES, userId)),
  },
  {
    text: PAST_COURSES,
    onClick: () => dispatch(operations.fetchPastCourses(PAST_COURSES, userId)),
  },
];
