/**
 *
 * FullCalendarView
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import RtFullCalendar from "../../components/RtFullCalendar";
import * as selectors from "./selectors";
import * as operations from "./actions";
import reducer from "./reducer";
import "./fullCalendarViewStyle.scss";
export default function FullCalendarView() {
  useInjectReducer({ key: "fullCalendarView", reducer });
  const dispatch = useDispatch();
  const { events, classes, isLoading } = useSelector((state) => ({
    events: selectors.upcomingEvents(state),
    classes: selectors.upcomingClasses(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchEventsAndCourses());
  }, []);

  const getCalendar = () => {
    if (isLoading) return <></>;
    return <RtFullCalendar upcomingEvents={events} upcomingClasses={classes} />;
  };

  return (
    <div className="fullCalendarView mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>FullCalendarView</title>
        <meta name="description" content="Description of FullCalendarView" />
      </Helmet>
      <Row>
        <Col>{getCalendar()}</Col>
      </Row>
    </div>
  );
}
FullCalendarView.propTypes = {};
