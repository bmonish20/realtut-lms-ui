/**
 *
 * EventCard
 *
 */
import React, { memo } from "react";
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, CardBody, CardImg, Col, Row, Button } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import { parseDateTime } from "utils/dateTimeHelpers";
import history from "utils/history";
import * as selectors from "./selectors";
import "./eventCardStyle.scss";

export function EventCardLoading() {
  return (
    <Card className="eventCard col">
      <CardBody>
        <Row>
          <Col xs="12" md="2" className="text-center mb-2">
            <Skeleton />
          </Col>
          <Col xs="12" md="10" className="px-2 px-md-3">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

function EventCard({
  id,
  title,
  type,
  eventHost,
  description,
  eventDateTime,
  imageUrl = require("assets/img/icons/common/google.svg"),
  isUserRegistered = false
}) {
  const { date, time } = parseDateTime(eventDateTime);

  return (
  <Card className="eventCard col">
    <CardBody>
      <Row>
        <Col xs="12" md="2" className="text-center mb-2 d-none d-md-block">
          <CardImg left="true" src={imageUrl} />
        </Col>
        <Col xs="12" md="10" className="px-2 px-md-3">
          <Row className="text-md">
            <strong className="mr-2">{title}</strong><div className="text-muted">by {selectors.hostedBy(eventHost)}</div>
          </Row>
          <Row className="text-md mb-2">
            <span className="text-muted text-sm font-weight-bold">Event Type: {type}</span>
          </Row>
          <Row className="mb-2">
            <div className="text-xs text-muted">{description}</div>
          </Row>
          <Row className="text-sm text-muted mb-3">
            <div><strong className="mr-1">Date:</strong>{date}</div>
            <div className="ml-2"><strong className="mr-1">Time:</strong>{time}</div>
          </Row>
          <Row>
            <Button
              size="sm"
              color="danger"
              onClick={() => history.push({
                pathname:`/event/${id}`,
                state: { id }
              })}
            >
              Follow Event
            </Button>
            {
              isUserRegistered ? 
                <Button
                  size="sm"
                  color="success"
                  onClick={() => history.push({
                    pathname:`/event/${id}`,
                    state: { id }
                  })}
                >
                  Seat Booked
                </Button>
              :
              <Button
                size="sm"
                color="primary"
                onClick={() => history.push({
                  pathname:`/event/${id}`,
                  state: { id }
                })}
              >
                Register Now
              </Button>
            }
          </Row>
        </Col>
      </Row>
    </CardBody>
  </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  eventHost: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  eventDateTime: PropTypes.string.isRequired,
  isUserRegistered: PropTypes.bool.isRequired,
};

export default memo(EventCard);
