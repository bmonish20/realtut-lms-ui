/*
 *
 * Course reducer
 *
 */
import produce from "immer";
import { parseDateTime } from "utils/dateTimeHelpers";
import { COURSE_DETAILS_INIT, SET_COURSE_DETAILS } from "./constants";
import { getHostedBy, getHostedByPictureUrl, getHostedById } from "./selectors";
import { shapeWithType, findCourseRating } from "./helpers";

export const initialState = {
  isLoading: true,
  title: null,
  date: null,
  time: null,
  type: null,
  startDate: null,
  hostedBy: null,
  hostedBypictureUrl: null,
  hostedById: null,
  shortDescription: null,
  description: null,
  prerequisite: null,
  tags: [],
  chapters: [],
  isUserRegistered: false,
  isUserReviewed: false,
  rating: 0,
  ratingId: null,
  courseRating: 0,
  pollId: null,
  pollQuestion: null,
  pollAnswers: null,
  forumMessagesLength: 0,
};

/* eslint-disable default-case, no-param-reassign */
const courseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COURSE_DETAILS_INIT:
        return initialState;
      case SET_COURSE_DETAILS: {
        const { date, time } = parseDateTime(action.payload.startDate);
        draft.isLoading = false;
        draft.title = action.payload.title;
        draft.type = action.payload.type;
        draft.date = date;
        draft.time = time;
        draft.startDate = action.payload.startDate;
        draft.hostedBy = getHostedBy(action);
        draft.hostedBypictureUrl = getHostedByPictureUrl(action);
        draft.hostedById = getHostedById(action);
        draft.shortDescription = action.payload.shortDescription;
        draft.description = action.payload.description;
        draft.prerequisite = action.payload.prerequisite;
        draft.tags = action.payload.tags;
        draft.isUserRegistered = action.payload.isRegistered;
        draft.isUserReviewed = action.payload.isReviewed;
        draft.rating = action.payload.rating;
        draft.ratingId = action.payload.ratingId;
        draft.courseRating = findCourseRating(action.payload.reviewedUsers);
        draft.chapters = shapeWithType(
          action.payload.chapters,
          action.payload.quizzes
        );
        draft.pollId = action.payload.poll.id;
        draft.pollQuestion = action.payload.poll.title;
        draft.pollAnswers = action.payload.poll.options;
        draft.forumMessagesLength = action.payload.totalForumMessages;
        break;
      }
    }
  });

export default courseReducer;
