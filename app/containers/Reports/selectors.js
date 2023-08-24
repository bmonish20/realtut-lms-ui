import _get from "lodash/get";
import { COURSE_RATING } from "./constants";

export const reportPageType = (state) =>
  _get(state, "reports.reportPageType", COURSE_RATING);

export const tableData = (state) => _get(state, "reports.tableData", []);

export const isLoading = (state) => _get(state, "reports.isLoading", true);
