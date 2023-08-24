/**
 *
 * Dashboard
 *
 */

import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button, Card, CardHeader } from "reactstrap";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import EventCard, { EventCardLoading } from "../../components/Cards/Event";
import TaskTable, { TaskTableSkeleton } from "../../components/TaskTable";
import ActivityTable from "../../components/ActivityTable";
import CourseProgressTable, {
  CourseProgressTableSkeleton,
} from "../../components/CourseProgressTable";
import PopularCourseTable, {
  PopularCourseTableSkeleton,
} from "../../components/PopularCourseTable";
import Calender from "../../components/Calender";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import DashboardPreference from "../DashboardPreference";
import reducer from "./reducer";
import moment from "moment-timezone";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./dashboardStyle.scss";
import { parseDateTime } from "utils/dateTimeHelpers";

export default function Dashboard() {
  useInjectReducer({ key: "dashboard", reducer });
  const [cookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  const user = selectors.userName(cookie);
  const loggedUserEmail = selectors.loggedUserEmail(cookie);
  const {
    events,
    sidebarEvents,
    tasks,
    courseProgress,
    popularCourses,
    activityFeed,
    isLoading,
    preferences,
  } = useSelector((state) => ({
    events: selectors.upcomingEvents(state),
    sidebarEvents: selectors.sidebarEvents(state),
    isLoading: selectors.isLoading(state),
    tasks: selectors.tasks(state),
    courseProgress: selectors.courseProgress(state),
    popularCourses: selectors.popularCourses(state),
    activityFeed: selectors.activityFeed(state),
    preferences: selectors.preferences(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchUserPreference(cookie.user.id));
    dispatch(operations.fetchEvents());
    dispatch(operations.downloadProfilePicture(loggedUserEmail));
  }, []);

  const onSelectDate = (info) => {
    dispatch(
      operations.fetchEventOnDate(
        moment(info.dateStr).toISOString(),
        moment(info.dateStr)
          .add(1, "day")
          .toISOString()
      )
    );
  };

  const getCard = () => {
    if (isLoading) {
      return (
        <>
          <EventCardLoading />
          <EventCardLoading />
        </>
      );
    }

    return events.map((event) => (
      <Row className="px-3" key={event._id}>
        <EventCard
          id={event.id}
          title={event.title}
          type={event.type}
          eventHost={event.hostedBy}
          description={event.shortDescription}
          eventDateTime={event.dateTime}
          imageUrl={event.imageUrl}
          isUserRegistered={event.isUserRegistered}
        />
      </Row>
    ));
  };

  const onEditDashboard = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: DashboardPreference,
      ChildProps: {
        isPopup: true,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const getEventComponent = () => {
    return (
      <>
        <Row className="px-3">
          <span className="h3 text-muted mb-2">Upcoming Events</span>
        </Row>
        {getCard()}
        <Row className="px-4 text-right">
          <Button
            color="primary"
            size="sm"
            outline={true}
            onClick={() => history.push("/events")}
          >
            <span className="btn-inner--text mr-1">View all</span>
            <span className="btn-inner--icon">
              <i className="fas fa-angle-double-right" />
            </span>
          </Button>
        </Row>
      </>
    );
  };

  const getTaskComponent = () => {
    return (
      <>
        <Row className="px-3 mt-3">
          <span className="h3 text-muted">Tasks</span>
        </Row>
        <Row>
          {isLoading ? <TaskTableSkeleton /> : <TaskTable tasks={tasks} />}
        </Row>
        <Row className="px-4 text-right">
          <Button
            color="primary"
            size="sm"
            outline={true}
            onClick={() => history.push("/tasks")}
          >
            <span className="btn-inner--text mr-1">View all</span>
            <span className="btn-inner--icon">
              <i className="fas fa-angle-double-right" />
            </span>
          </Button>
        </Row>
      </>
    );
  };

  const getPopularCoursesComponent = () => {
    return (
      <>
        <Row className="px-3 mt-3">
          <span className="h3 text-muted">Popular Courses</span>
        </Row>
        <Row>
          {isLoading ? (
            <PopularCourseTableSkeleton />
          ) : (
            <PopularCourseTable popularCourses={popularCourses} />
          )}
        </Row>
      </>
    );
  };

  const getActivityComponent = () => {
    return (
      <>
        <Row className="px-3 mt-3">
          <span className="h3 text-muted">Activity Feed</span>
        </Row>
        <Row>
          {isLoading ? (
            <PopularCourseTableSkeleton />
          ) : (
            <ActivityTable activityFeed={activityFeed} />
          )}
        </Row>
        <Row className="px-4 text-right">
          <Button
            color="primary"
            size="sm"
            outline={true}
            onClick={() => history.push("/activity-feed")}
          >
            <span className="btn-inner--text mr-1">View all</span>
            <span className="btn-inner--icon">
              <i className="fas fa-angle-double-right" />
            </span>
          </Button>
        </Row>
      </>
    );
  };

  const getCourseProgressComponent = () => {
    return (
      <>
        <Row className="px-3 mt-3">
          <span className="h3 text-muted">Course Progress</span>
        </Row>
        <Row>
          {isLoading ? (
            <CourseProgressTableSkeleton />
          ) : (
            <CourseProgressTable courseProgress={courseProgress} />
          )}
        </Row>
      </>
    );
  };

  const getSidebarEvents = () => {
    return sidebarEvents.map((sidebarEvent) => {
      const { time: parsedTime } = parseDateTime(sidebarEvent.dateTime);
      return (
        <CardHeader>
          <Row>
            <Col>{sidebarEvent.title}</Col>
          </Row>
          <Row className="text-xs text-muted">
            <Col>{parsedTime}</Col>
          </Row>
        </CardHeader>
      );
    });
  };

  return (
    <div className="dashboard mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Row className="mt-2 mb-2">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => onEditDashboard()}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-edit" />
            </span>
            <span className="btn-inner--text">Manage Dashboard</span>
          </Button>
        </div>
      </Row>
      <Row>
        <Col xs="12" md={sidebarEvents.length ? "5" : "6"}>
          <Row className="px-3">
            <span className="h2 text-primary mb-2">{`Welcome ${user}`}</span>
          </Row>
          {preferences.event ? getEventComponent() : ""}
          {preferences.task ? getTaskComponent() : ""}
          {preferences.popularCourses ? getPopularCoursesComponent() : ""}
          {preferences.activityFeed ? getActivityComponent() : ""}
        </Col>
        <Col md={sidebarEvents.length ? "5" : "6"}>
          {preferences.calendar ? (
            <Calender upcomingEvents={events} onSelectDate={onSelectDate} />
          ) : (
            ""
          )}
          {preferences.courseProgress ? getCourseProgressComponent() : ""}
        </Col>
        {sidebarEvents ? (
          <Col md="2">
            <Card>{getSidebarEvents()}</Card>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </div>
  );
}

Dashboard.propTypes = {};
