/**
 *
 * WebinarCard
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import _get from "lodash/get";
import Can from "../../Can";
import Tag from "../../Tag";
import { permissions } from "utils/permissions";
import { parseDateTime } from "utils/dateTimeHelpers";
import * as selectors from "./selectors";
import history from "utils/history";
import "./webinarCardStyle.scss";

export function WebinarCardSkeleton() {
  return (
    <div className="webinarCard">
      <Card>
        <CardHeader>
          <Skeleton />
          <Skeleton />
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col xs="2">
              <Skeleton circle={true} height={45} width={45} />
            </Col>
            <Col xs="4">
              <Skeleton height={11} />
              <Skeleton height={10} />
            </Col>
          </Row>
          <Skeleton count={3} />
          <Row className="mt-3">
            <Col xs="3">
              <Skeleton />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

function WebinarCard({
  id,
  title,
  type,
  dateTime,
  hostedBy,
  description,
  onClick,
  onDelete,
  onEdit,
  registeredCount,
  isUserRegistered = false,
}) {
  const [cookie] = useCookies(["user"]);
  const { date, time } = parseDateTime(dateTime);

  const hostedByPictureUrl = selectors.hostedByPicture(hostedBy);
  const hostedById = selectors.hostedById(hostedBy);
  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right">
        <Can
          permissions={[
            permissions.EDIT_ALL_EVENT,
            {
              permission: permissions.EDIT_MY_EVENT,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-edit text-muted text-sm hover-pointer hover-color-primary mr-2"
            onClick={() => onEdit(id)}
          />
        </Can>
        <Can
          permissions={[
            permissions.DELETE_ALL_EVENT,
            {
              permission: permissions.DELETE_MY_EVENT,
              value: isOwner,
            },
          ]}
        >
          <i
            className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
            onClick={() => onDelete(id, title)}
          />
        </Can>
      </Col>
    </>
  );

  const truncate = (str) => {
    return str.length > 100 ? str.substring(0, 97) + "..." : str;
  };

  return (
    <Card className="h-100">
      <CardHeader>
        <Row className="mb-2 text-primary text-lg">
          <Col xs="9" className="font-weight-bold">
            {title}
          </Col>
          {getOptions(
            selectors.getUserId(cookie) === selectors.hostedById(hostedBy)
          )}
        </Row>
        <Row className="mx-1 mb-3">
          <Tag title={type} />
        </Row>
        <Row className="mx-1 text-xs text-muted">
          <div className="mr-3">
            <i className="ni ni-calendar-grid-58 mr-1" />
            {date}
          </div>
          <div className="mr-3">
            <i className="far fa-clock mr-1" />
            {time}
          </div>
          <div>
            <i className="fas fa-globe mr-1" />
            {registeredCount} Registered
          </div>
        </Row>
      </CardHeader>
      <CardBody className="d-flex flex-column">
        <Row className="mx-2 mb-3">
          <a
            className="avatar avatar-sm rounded-circle hover-pointer"
            onClick={(e) => history.push(`/trainer?id=${hostedById}`)}
          >
            {hostedByPictureUrl ? (
              <img alt="..." src={hostedByPictureUrl} />
            ) : (
              <i className="ni ni-circle-08 text-xl" />
            )}
          </a>
          <Col className="ml-3 text-muted">
            <Row
              className="font-weight-bold hover-pointer"
              onClick={(e) => history.push(`/trainer?id=${hostedById}`)}
            >
              {selectors.hostedByName(hostedBy)}
            </Row>
            <Row className="text-xs">{selectors.hostedByTitle(hostedBy)}</Row>
          </Col>
        </Row>
        <Row className="mx-2 text-sm text-muted">{truncate(description)}</Row>
        <Row className="mx-2 mt-auto">
          <Button
            size="sm"
            className="btn-icon btn-3"
            color="primary"
            type="button"
            onClick={() => onClick(id)}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-laptop" />
            </span>
            <span className="btn-inner--text">Preview</span>
          </Button>
          {isUserRegistered ? (
            <Button
              size="sm"
              className="btn-icon btn-3"
              color="success"
              type="button"
            >
              <span className="btn-inner--icon">
                <i className="fas fa-check" />
              </span>
              <span className="btn-inner--text">Seat Booked</span>
            </Button>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  );
}

WebinarCard.propTypes = {};

export default memo(WebinarCard);
