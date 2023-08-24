/**
 *
 * MyCourses
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import CourseCard, { MyCourseLoading } from "../../components/Cards/MyCourse";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./myCoursesStyle.scss";

export default function MyCourses() {
  useInjectReducer({ key: "myCourses", reducer });
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => ({
    courses: selectors.courses(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchCourses());
  }, []);

  const getLoadingComponent = () => {
    return (
      <>
        <Col xs="12" md="6" lg="4">
          <MyCourseLoading />
        </Col>
        <Col xs="12" md="6" lg="4">
          <MyCourseLoading />
        </Col>
      </>
    );
  };

  const getComponent = () => {
    return courses.map(
      ({ courseId: course, id, courseProgress }, index) =>
        course && (
          <React.Fragment key={id}>
            <Col xs="12" md="6" lg="4">
              <CourseCard
                id={course.id}
                title={course.title}
                type={course.type}
                summary={course.shortDescription}
                hostedBy={course.hostedBy}
                totalChapters={course.chapters.length + course.quizzes.length}
                currentChapter={courseProgress}
              />
            </Col>
            {(index + 1) % 3 === 0 ? (
              <div key={`${id}-${index}`} className="w-100" />
            ) : null}
          </React.Fragment>
        )
    );
  };

  return (
    <div className="myCourses mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>MyCourses</title>
        <meta name="description" content="Description of MyCourses" />
      </Helmet>
      <Row className="mt-3">
        {isLoading ? getLoadingComponent() : getComponent()}
      </Row>
    </div>
  );
}

MyCourses.propTypes = {};
