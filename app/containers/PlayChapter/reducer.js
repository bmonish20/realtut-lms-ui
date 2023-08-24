/*
 *
 * PlayChapter reducer
 *
 */
import produce from "immer";
import { INIT_PAGE, SET_COURSE_DETAILS, SET_RESUME_FROM } from "./constants";
import {
  getHostedBy,
  getHostedByPictureUrl,
  getHostedById,
} from "../Course/selectors";
import { shapeWithType } from "./helpers";

export const initialState = {
  isLoading: true,
  title: "",
  hostedBy: null,
  hostedByPictureUrl: null,
  hostedById: null,
  shortDescription: null,
  chapters: [],
  resumeFrom: 0,
};

/* eslint-disable default-case, no-param-reassign */
const playChapterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT_PAGE:
        return initialState;
      case SET_COURSE_DETAILS: {
        draft.isLoading = false;
        draft.title = action.payload.title;
        draft.type = action.payload.type;
        draft.hostedBy = getHostedBy(action);
        draft.hostedByPictureUrl = getHostedByPictureUrl(action);
        draft.hostedById = getHostedById(action);
        draft.chapters = shapeWithType(
          action.payload.chapters,
          action.payload.quizzes
        );
        draft.shortDescription = action.payload.shortDescription;
        draft.resumeFrom = action.payload.resumeFrom;
        break;
      }
      case SET_RESUME_FROM:
        draft.resumeFrom = action.payload;
        break;
    }
  });

export default playChapterReducer;
