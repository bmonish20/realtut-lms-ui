/*
 *
 * Tasks reducer
 *
 */
import produce from "immer";
import {
  UPDATE_TASK_LIST,
  TASK_PAGE_SET_LOADING,
  TASK_PAGE_CHANGE_FILTER,
} from "./constants";

export const initialState = {
  isLoading: true,
  tasks: [],
  paginationDetails: {},
  selectedStatus: "",
};

/* eslint-disable default-case, no-param-reassign */
const tasksReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_TASK_LIST: {
        draft.tasks = action.payload.docs;
        draft.paginationDetails = {
          hasNextPage: action.payload.hasNextPage,
          hasPrevPage: action.payload.hasPrevPage,
          page: action.payload.page,
          nextPage: action.payload.nextPage,
          prevPage: action.payload.prevPage,
          totalPages: action.payload.totalPages,
          pageNumbers: Array.from(
            { length: action.payload.totalPages },
            (_, index) => index + 1
          ),
        };
        draft.isLoading = false;
        break;
      }
      case TASK_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
      case TASK_PAGE_CHANGE_FILTER:
        draft.selectedStatus = action.payload;
        break;
    }
  });

export default tasksReducer;
