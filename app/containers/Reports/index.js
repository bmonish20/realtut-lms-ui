/**
 *
 * Reports
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Table, Spinner } from "reactstrap";
import Rating from "react-simple-star-rating";
import Select from "components/RtDropDown";
import { useInjectReducer } from "utils/injectReducer";
import { parseDate } from "utils/dateTimeHelpers";
import { dropdownOptions } from "./helpers";
import * as selectors from "./selectors";
import * as operations from "./actions";
import reducer from "./reducer";
import "./reportsStyle.scss";

export default function Reports() {
  useInjectReducer({ key: "reports", reducer });
  const dispatch = useDispatch();
  const { reportPageType, tableData, isLoading } = useSelector((state) => ({
    reportPageType: selectors.reportPageType(state),
    tableData: selectors.tableData(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchReports(reportPageType));
  }, []);

  const getCourseRatingTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Trainer Name</th>
            <th scope="col">Course Name</th>
            <th scope="col">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ courseId, userId, rating }, index) => (
            <tr key={index}>
              <td>{userId.name}</td>
              <td>{userId.email}</td>
              <td>{userId.phoneNumber}</td>
              <td>{courseId.hostedBy.name}</td>
              <td>{courseId.title}</td>
              <td>
                <Rating
                  ratingValue={rating}
                  fillColor="orange"
                  size={15}
                  className="foo"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const getStudentProgressTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Course Progress</th>
            <th scope="col">Enrollment</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ courseProgress, courseId, userId }, index) => (
            <tr key={index}>
              <td>{userId.name}</td>
              <td>{userId.email}</td>
              <td>{userId.phoneNumber}</td>
              <td>{parseDate(courseId.startDate, "DD-MM-YYYY")}</td>
              <td>{parseDate(courseId.courseEndDate, "DD-MM-YYYY")}</td>
              <td>
                {courseId.chapters
                  ? `${(courseProgress / courseId.chapters.length) * 100}%`
                  : "NOOO"}
              </td>
              <td>
                {courseProgress / courseId.chapters.length == 1
                  ? "Completed"
                  : "Ongoing"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const getCourseCompletionTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Course Progress</th>
            <th scope="col">Enrollment</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ courseProgress, courseId, userId }, index) =>
            courseProgress / courseId.chapters.length == 1 ? (
              <tr key={index}>
                <td>{userId.name}</td>
                <td>{userId.email}</td>
                <td>{userId.phoneNumber}</td>
                <td>{parseDate(courseId.startDate, "DD-MM-YYYY")}</td>
                <td>{parseDate(courseId.courseEndDate, "DD-MM-YYYY")}</td>
                <td>
                  {courseId.chapters
                    ? `${(courseProgress / courseId.chapters.length) * 100}%`
                    : "NOOO"}
                </td>
                <td>
                  {courseProgress / courseId.chapters.length == 1
                    ? "Completed"
                    : "Ongoing"}
                </td>
              </tr>
            ) : (
              ""
            )
          )}
        </tbody>
      </Table>
    );
  };

  const getStudentEnrollmentTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Course Title</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ courseProgress, courseId, userId }, index) => (
            <tr key={index}>
              <td>{userId.name}</td>
              <td>{userId.email}</td>
              <td>{userId.phoneNumber}</td>
              <td>{courseId.title}</td>
              <td>{parseDate(courseId.startDate, "DD-MM-YYYY")}</td>
              <td>{parseDate(courseId.courseEndDate, "DD-MM-YYYY")}</td>
              <td>
                {courseProgress / courseId.chapters.length == 1
                  ? "Graduated"
                  : "Enrolled"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const getStudentAssessmentTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Attempted</th>
            <th scope="col">Total Score</th>
            <th scope="col">User Score</th>
            <th scope="col">Result %</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            ({ userName, attempted, totalScore, userScore }, index) => (
              <tr key={index}>
                <td>{userName}</td>
                <td>{attempted}</td>
                <td>{totalScore}</td>
                <td>{userScore}</td>
                <td>
                  {totalScore && userScore
                    ? `${Math.round((userScore / totalScore) * 100)}%`
                    : "-"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  };

  const getStudentLeaderboardTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Courses attempted</th>
            <th scope="col">Courses completed</th>
            <th scope="col">Total score</th>
            <th scope="col">User score</th>
            <th scope="col">Result %</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            (
              {
                name,
                totalScore,
                userScore,
                courseCompleted,
                courseTotal,
                result,
              },
              index
            ) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{courseTotal}</td>
                <td>{courseCompleted}</td>
                <td>{totalScore}</td>
                <td>{userScore}</td>
                <td>{result} %</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  };

  const getMonthlyStudentTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Trainees</th>
            <th scope="col">Courses</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ month, trainees, courses, percentage }, index) => (
            <tr key={index}>
              <td>{month}</td>
              <td>{trainees}</td>
              <td>{courses}</td>
              <td>{`${percentage}%`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const getCourseWiseExamTable = () => {
    return (
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Questions</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Passing Marks</th>
            <th scope="col">User Marks</th>
            <th scope="col">Percentage</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            (
              {
                name,
                email,
                questionsCount,
                totalMarks,
                passingMarks,
                userMarks,
                percentage,
                result,
              },
              index
            ) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{questionsCount}</td>
                <td>{totalMarks}</td>
                <td>{passingMarks}</td>
                <td>{userMarks}</td>
                <td>{percentage ? `${percentage}%` : "-"}</td>
                <td
                  className={result == "Pass" ? "text-success" : "text-danger"}
                >
                  {percentage ? result : "-"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="reports mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Reports</title>
        <meta name="description" content="Description of Reports" />
      </Helmet>
      <Row className="mt-3 mb-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Select text={reportPageType} options={dropdownOptions(dispatch)} />
        </div>
      </Row>
      {isLoading && (
        <Row className="d-flex justify-content-center">
          <Col md="1">
            <Spinner size="md" color="primary" />
          </Col>
        </Row>
      )}
      {!isLoading &&
        reportPageType == "Course Rating" &&
        getCourseRatingTable()}
      {!isLoading &&
        reportPageType == "Student Progress" &&
        getStudentProgressTable()}
      {!isLoading &&
        reportPageType == "Course Completion" &&
        getCourseCompletionTable()}
      {!isLoading &&
        reportPageType == "Student Enrollment" &&
        getStudentEnrollmentTable()}
      {!isLoading &&
        reportPageType == "Student Assessment" &&
        getStudentAssessmentTable()}
      {!isLoading &&
        reportPageType == "Student Leaderboard" &&
        getStudentLeaderboardTable()}
      {!isLoading &&
        reportPageType == "Monthly Student" &&
        getMonthlyStudentTable()}
      {!isLoading &&
        reportPageType == "Course Wise Exam" &&
        getCourseWiseExamTable()}
    </div>
  );
}

Reports.propTypes = {};
