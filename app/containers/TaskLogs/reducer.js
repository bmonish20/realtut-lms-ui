/*
 *
 * TaskLogs reducer
 *
 */
import produce from "immer";
import { SET_TASK_DETAILS, VIEW_HISTORY_INIT } from "./constants";

export const initialState = {
  isLoading: true,
  taskName: "",
  logs: [],
};

/* eslint-disable default-case, no-param-reassign */
const taskLogsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TASK_DETAILS:
        draft.taskName = action.payload.taskName;
        draft.logs = action.payload.logs;
        draft.isLoading = false;
        break;
      case VIEW_HISTORY_INIT:
        return initialState;
    }
  });

export default taskLogsReducer;
