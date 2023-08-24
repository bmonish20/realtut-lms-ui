/*
 *
 * Article reducer
 *
 */
import produce from "immer";
import { SET_ARTICLE, INIT } from "./constants";
import { parseDate } from "utils/dateTimeHelpers";
import { getWrittedById, getWrittenBy, getWrittedByPicture } from "./selector";

export const initialState = {
  title: null,
  category: null,
  description: null,
  writtedById: null,
  writtedBy: null,
  writtedByPicture: null,
  createdAt: null,
  readDurationInMins: null,
  likes: 0,
  isLiked: false,
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const articleReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_ARTICLE: {
        const { 
          title,
          category,
          description,
          writtenBy,
          createdAt,
          readDurationInMins,
          likes,
          isLiked,
         } = action.payload;
        draft.isLoading = false;
        draft.title = title;
        draft.category = category;
        draft.description = description;
        draft.writtedById = getWrittedById(writtenBy),
        draft.writtedBy = getWrittenBy(writtenBy);
        draft.writtedByPicture = getWrittedByPicture(writtenBy);
        draft.createdAt = parseDate(createdAt, "MMM YYYY");
        draft.readDurationInMins = readDurationInMins;
        draft.likes = likes;
        draft.isLiked = isLiked;
        break;
      }
    }
  });

export default articleReducer;
