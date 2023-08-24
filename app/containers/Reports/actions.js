/*
 *
 * Reports actions
 *
 */

import {
  SET_REPORT_PAGE_TYPE,
  SET_REPORT_LOADING,
  SET_TABLE_DATA,
} from "./constants";
import {
  getCourseRatings,
  getStudentProgress,
  getStudentAssessment,
  getMonthlyStudent,
  getUserQuizResponses,
} from "./reportsApi";
import _get from "lodash/get";
import NotificationHandler from "../../components/Notifications/NotificationHandler";
import {
  mapCourseWise,
  mapMonthlyReport,
  mapStudentAssessment,
  mapStudentLeaderBoard,
} from "./reportHelpers";

export const fetchReports = (reportPageType) => {
  return async (dispatch) => {
    try {
      switch (reportPageType) {
        case "Course Rating":
          dispatch(showLoading(true));
          const { data: courseRatingsData } = await getCourseRatings();
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(courseRatingsData));
          break;
        case "Student Progress":
          dispatch(showLoading(true));
          const { data: studentProgressData } = await getStudentProgress();
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(studentProgressData));
          break;
        case "Course Completion":
          dispatch(showLoading(true));
          const { data: courseCompletionData } = await getStudentProgress();
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(courseCompletionData));
          break;
        case "Student Enrollment":
          dispatch(showLoading(true));
          const { data: courseEnrollmentData } = await getStudentProgress();
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(courseEnrollmentData));
          break;
        case "Student Assessment":
          dispatch(showLoading(true));
          const { data: studentAssessmentData } = await getStudentAssessment();
          const shapedAssessment = mapStudentAssessment(studentAssessmentData);
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(shapedAssessment));
          break;
        case "Monthly Student":
          dispatch(showLoading(true));
          const { data: monthlyStudentData } = await getMonthlyStudent();
          const shapedMonthlyData = mapMonthlyReport(monthlyStudentData);
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(shapedMonthlyData));
          break;
        case "Course Wise Exam":
          dispatch(showLoading(true));
          const { data: courseWiseData } = await getStudentProgress();
          const shapedCourseWise = await mapCourseWise(courseWiseData);
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(shapedCourseWise));
          break;
        case "Student Leaderboard":
          dispatch(showLoading(true));
          const { data: LeaderboardData } = await getStudentProgress();
          const shapedLeaderboardData = await mapStudentLeaderBoard(
            LeaderboardData
          );
          dispatch(setReportPageType(reportPageType));
          dispatch(setTableData(shapedLeaderboardData));
          break;
      }
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to fetch Report Details",
      });
    }
  };
};

const showLoading = (payload) => ({
  type: SET_REPORT_LOADING,
  payload,
});

const setTableData = (payload = []) => ({
  type: SET_TABLE_DATA,
  payload,
});

const setReportPageType = (payload) => ({
  type: SET_REPORT_PAGE_TYPE,
  payload,
});
