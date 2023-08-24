/**
 *
 * Calender
 *
 */

import React, { memo } from "react";
import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { parseDate } from "utils/dateTimeHelpers";
import history from "utils/history";
import "./calenderStyle.scss";

function Calender({ upcomingEvents = [], onSelectDate }) {
  const [calendar, setCalender] = React.useState({});
  let events = [];
  const calendarRef = React.useRef(null);

  React.useEffect(() => {
    upcomingEvents.map(({ title, dateTime }) =>
      events.push({
        title,
        date: parseDate(dateTime, "YYYY-MM-DD"),
        className: "bg-primary text-secondary",
      })
    );
    createCalender();
  }, []);

  const createCalender = () => {
    const calendarObj = new Calendar(calendarRef.current, {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      dateClick: (info) => onSelectDate(info),
      editable: true,
      headerToolbar: {
        start: null,
        center: "title",
        end: null,
      },
      events: events,
    });
    calendarObj.render();
    setCalender(calendarObj);
  };

  return (
    <Card className="card-calender calender">
      <CardHeader>
        <Row>
          <div className="px-2">
            <i className="ni ni-calendar-grid-58 text-muted" />
          </div>
          <Col className="text-left">
            <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                history.push("/calendar");
              }}
              size="sm"
            >
              View All
            </Button>
          </Col>
          <Col className="text-right">
            <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                calendar.prev();
              }}
              size="sm"
            >
              <i className="fas fa-angle-left" />
            </Button>
            <Button
              className="fullcalendar-btn-prev btn-neutral"
              color="default"
              onClick={() => {
                calendar.today();
              }}
              size="sm"
            >
              Today
            </Button>
            <Button
              className="fullcalendar-btn-next btn-neutral"
              color="default"
              onClick={() => {
                calendar.next();
              }}
              size="sm"
            >
              <i className="fas fa-angle-right" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div
          className="calendar"
          data-toggle="calendar"
          id="calendar"
          ref={calendarRef}
        />
      </CardBody>
    </Card>
  );
}

Calender.propTypes = {};

export default memo(Calender);
