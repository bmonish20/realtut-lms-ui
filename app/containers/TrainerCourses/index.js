/**
 *
 * TrainerCourses
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import CourseCard, { CourseCardSkeleton } from "../../components/Cards/Course";
import { useCookies } from "react-cookie";
import Can from "../../components/Can";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { permissions } from "utils/permissions";
import { dropdownOptions } from "./helpers";
import Select from "components/RtDropDown";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./trainerCoursesStyle.scss";

export default function TrainerCourses() {
  useInjectReducer({ key: "trainerCourses", reducer });
  const dispatch = useDispatch();
  const { isLoading, courses, coursePageType } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    courses: selectors.courses(state),
    coursePageType: selectors.coursePageType(state),
  }));
  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    dispatch(operations.fetchCourses(coursePageType, cookie.user.id));
  }, []);

  const onClick = (id) =>
    history.push({
      pathname: `/course/${id}`,
      state: { id },
    });

  const onDelete = (id, title) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id, coursePageType)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{title}</span>. Do you
          want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onEdit = (id) => history.push(`/edit-course?id=${id}`);

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4" key="skeleton-1">
            <CourseCardSkeleton />
          </Col>
          <Col xs="12" md="4" key="skeleton-2">
            <CourseCardSkeleton />
          </Col>
        </>
      );
    return courses.map((course, index) => (
      <React.Fragment key={course.id}>
        <Col xs="12" md="6" lg="4">
          <CourseCard
            key={`courseCard-${course.id}`}
            id={course.id}
            title={course.title}
            description={course.shortDescription}
            hostedBy={course.hostedBy}
            onClick={onClick}
            onDelete={onDelete}
            onEdit={onEdit}
            isUserRegistered={course.isUserRegistered}
            imageUrl={course.pictureUrl}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${course.id}-${index}`} className="w-100" />
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <div className="trainerCourses mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>My Courses</title>
        <meta name="description" content="Description of TrainerCourses" />
      </Helmet>
      <Row className="mt-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Select
            text={coursePageType}
            options={dropdownOptions(dispatch, cookie.user.id)}
          />
          <Can permissions={[permissions.ADD_COURSE]}>
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/add-course")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Course</span>
            </Button>
          </Can>
        </div>
      </Row>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

TrainerCourses.propTypes = {};
