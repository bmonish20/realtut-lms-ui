/*
 *
 * Reports reducer
 *
 */
import produce from "immer";
import {
  COURSE_RATING,
  SET_REPORT_PAGE_TYPE,
  SET_TABLE_DATA,
  SET_REPORT_LOADING,
} from "./constants";

export const initialState = {
  reportPageType: COURSE_RATING,
  tableData: [],
  isLoading: true,
};

/* eslint-disable default-case, no-param-reassign */
const reportsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_REPORT_PAGE_TYPE:
        draft.reportPageType = action.payload;
        break;
      case SET_TABLE_DATA:
        draft.tableData = action.payload;
        draft.isLoading = false;
        break;
      case SET_REPORT_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default reportsReducer;
