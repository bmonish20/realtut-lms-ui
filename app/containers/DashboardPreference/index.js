/**
 *
 * DashboardPreference
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import { useCookies } from "react-cookie";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./dashboardPreferenceStyle.scss";

export default function DashboardPreference({ onConfirm = () => {} }) {
  useInjectReducer({ key: "dashboardPreference", reducer });
  const dispatch = useDispatch();
  const {
    taskPreference,
    eventPreference,
    calendarPreference,
    courseProgressPreference,
    popularCoursesPreference,
    activityFeedPreference,
    isLoading,
  } = useSelector((state) => ({
    taskPreference: selectors.taskPreference(state),
    eventPreference: selectors.eventPreference(state),
    calendarPreference: selectors.calendarPreference(state),
    courseProgressPreference: selectors.courseProgressPreference(state),
    popularCoursesPreference: selectors.popularCoursesPreference(state),
    activityFeedPreference: selectors.activityFeedPreference(state),
    isLoading: selectors.isLoading(state),
  }));

  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    dispatch(operations.getPreferences(cookie.user.id));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const userId = cookie.user.id;
    dispatch(
      operations.onSubmit(
        userId,
        {
          task: taskPreference,
          event: eventPreference,
          calendar: calendarPreference,
          courseProgress: courseProgressPreference,
          popularCourses: popularCoursesPreference,
          activityFeed: activityFeedPreference,
        },
        onConfirm
      )
    );
  };
  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button
          type="button"
          color="primary"
          className="btn-icon"
          size="sm"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">Submit</span>
        </Button>
      );
    return (
      <Button
        type="button"
        size="sm"
        color="primary"
        onClick={(e) => onSubmit(e)}
      >
        Submit
      </Button>
    );
  };

  return (
    <div className="dashboardPreference">
      <Helmet>
        <title>DashboardPreference</title>
        <meta name="description" content="Description of DashboardPreference" />
      </Helmet>
      <Row className="text-left text-primary mx-1">
        <Col>Select your Dashboard Preference</Col>
      </Row>
      <Form className="mx-auto mt-3">
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={eventPreference}
              onChange={(e) =>
                dispatch(operations.changeEventPreference(e.target.checked))
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Events</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={taskPreference}
              onChange={(e) =>
                dispatch(operations.changeTaskPreference(e.target.checked))
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Tasks</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={calendarPreference}
              onChange={(e) =>
                dispatch(operations.changeCalendarPreference(e.target.checked))
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Calendar</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={courseProgressPreference}
              onChange={(e) =>
                dispatch(
                  operations.changeCourseProgressPreference(e.target.checked)
                )
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Course Progress</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={popularCoursesPreference}
              onChange={(e) =>
                dispatch(
                  operations.changePopularCoursePreference(e.target.checked)
                )
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Popular Courses</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={3}>
            <Input
              type="checkbox"
              checked={activityFeedPreference}
              onChange={(e) =>
                dispatch(
                  operations.changeActivityFeedPreference(e.target.checked)
                )
              }
            />
          </Col>
          <Col sm={4} className="text-left">
            <Label check>Activity Feed</Label>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

DashboardPreference.propTypes = {};
