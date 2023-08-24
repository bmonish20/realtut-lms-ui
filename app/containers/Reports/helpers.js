import * as operations from "./actions";
import {
  COURSE_RATING,
  STUDENT_PROGRESS,
  COURSE_COMPLETION,
  STUDENT_ENROLLMENT,
  STUDENT_ASSESSMENT,
  STUDENT_LEADERBOARD,
  MONTHLY_STUDENT,
  COURSE_WISE_EXAM,
} from "./constants";
export const dropdownOptions = (dispatch) => [
  {
    text: COURSE_RATING,
    onClick: () => dispatch(operations.fetchReports(COURSE_RATING)),
  },
  {
    text: STUDENT_PROGRESS,
    onClick: () => dispatch(operations.fetchReports(STUDENT_PROGRESS)),
  },
  {
    text: COURSE_COMPLETION,
    onClick: () => dispatch(operations.fetchReports(COURSE_COMPLETION)),
  },
  {
    text: STUDENT_ENROLLMENT,
    onClick: () => dispatch(operations.fetchReports(STUDENT_ENROLLMENT)),
  },
  {
    text: STUDENT_ASSESSMENT,
    onClick: () => dispatch(operations.fetchReports(STUDENT_ASSESSMENT)),
  },
  {
    text: STUDENT_LEADERBOARD,
    onClick: () => dispatch(operations.fetchReports(STUDENT_LEADERBOARD)),
  },
  {
    text: MONTHLY_STUDENT,
    onClick: () => dispatch(operations.fetchReports(MONTHLY_STUDENT)),
  },
  {
    text: COURSE_WISE_EXAM,
    onClick: () => dispatch(operations.fetchReports(COURSE_WISE_EXAM)),
  },
];
