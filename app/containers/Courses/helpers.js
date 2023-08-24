import * as operations from "./actions";
import { NEW_COURSES, PAST_COURSES } from "./constants";

export const dropdownOptions = (dispatch) => [
  {
    text: NEW_COURSES,
    onClick: () => dispatch(operations.fetchCourses(NEW_COURSES)),
  },
  {
    text: PAST_COURSES,
    onClick: () => dispatch(operations.fetchPastCourses(PAST_COURSES)),
  },
];

export const findCourseRating = (reviews = []) => {
  var courseRating = 0;
  var total = 0;

  reviews.map((review) => {
    total += review.rating;
  });

  courseRating = total / reviews.length;

  return courseRating || 0;
};
