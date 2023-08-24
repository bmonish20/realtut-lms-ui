/*
 *
 * TaskDetails reducer
 *
 */
import produce from "immer";
import { SET_TASK_DETAILS, TASK_DETAILS_INIT } from "./constants";
import { parseDateTime, calculateTimeLeft } from "utils/dateTimeHelpers";
export const initialState = {
  taskName: "",
  category: "",
  subCategory: "",
  client: "",
  startDate: "",
  dueDate: "",
  time: "",
  priority: "",
  description: "",
  status: "",
  fileUrl: [],
  timeLeft: "",
};

/* eslint-disable default-case, no-param-reassign */
const taskDetailsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TASK_DETAILS:
        const { date: startDate } = action.payload.startDate
          ? parseDateTime(action.payload.startDate)
          : { date: "NA" };
        const { date: dueDate } = action.payload.dueDate
          ? parseDateTime(action.payload.dueDate)
          : { date: "NA" };
        const { time } = action.payload.time
          ? parseDateTime(action.payload.time)
          : { time: "NA" };
        draft.taskName = action.payload.taskName;
        draft.category = action.payload.category;
        draft.subCategory = action.payload.subCategory;
        draft.client = action.payload.client;
        draft.startDate = startDate;
        draft.dueDate = dueDate;
        draft.time = time;
        draft.priority = action.payload.priority;
        draft.description = action.payload.description;
        draft.status = action.payload.status;
        draft.fileUrl = action.payload.fileUrl;
        draft.timeLeft = calculateTimeLeft(
          action.payload.dueDate,
          action.payload.time
        );
        break;
      case TASK_DETAILS_INIT:
        return initialState;
    }
  });

export default taskDetailsReducer;
