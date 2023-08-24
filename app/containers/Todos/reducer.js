/*
 *
 * Todos reducer
 *
 */
import produce from "immer";
import { UPDATE_TODO_LIST, TODO_PAGE_SET_LOADING } from "./constants";

export const initialState = {
  isLoading: true,
  todos: [],
};

/* eslint-disable default-case, no-param-reassign */
const todosReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_TODO_LIST: {
        draft.todos = action.payload;
        draft.isLoading = false;
        break;
      }
      case TODO_PAGE_SET_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default todosReducer;
