/**
 *
 * CourseCard
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Button,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import Can from "../../Can";
import * as selectors from "./selectors";
import { permissions } from "utils/permissions";
import "./courseCardStyle.scss";
import history from "utils/history";

export function CourseCardSkeleton() {
  return (
    <div className="courseCard">
      <Card>
        <div className="text-center px-1 py-2 mt-3">
          <Skeleton circle={true} height={150} width={150} />
        </div>
        <CardBody>
          <CardTitle>
            <Skeleton className="w-50" />
          </CardTitle>
          <Skeleton count={4} />
          <Skeleton className="w-25 mt-4" />
        </CardBody>
      </Card>
    </div>
  );
}

function CourseCard({
  id,
  title,
  description,
  hostedBy,
  courseRating,
  imageUrl = require("assets/img/icons/common/course1.svg"),
  onClick,
  onDelete,
  onEdit,
  isUserRegistered = false,
}) {
  const [cookie] = useCookies(["user"]);
  const hostedByPicture = selectors.hostedByPicture(hostedBy);
  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right mt-2">
        <Can
          permissions={[
            permissions.EDIT_ALL_COURSE,
            {
              permission: permissions.EDIT_MY_COURSE,
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
            permissions.DELETE_ALL_COURSE,
            {
              permission: permissions.DELETE_MY_COURSE,
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
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  };

  return (
    <Card>
      {getOptions(selectors.userId(cookie) == selectors.hostedBy(hostedBy))}
      <div className="text-center">
        <CardImg
          className="px-1 py-2 h-50 w-50"
          alt=""
          src={imageUrl || require("assets/img/icons/common/course1.svg")}
          top
        />
      </div>
      <CardBody>
        <CardTitle>
          <Row className="ml-1">
            <strong className="text-lg text-primary">{title}</strong>
          </Row>
          <Row className="mx-1 mt-2">
            <a
              className="avatar avatar-xs rounded-circle hover-pointer"
              onClick={(e) =>
                history.push(`/trainer?id=${selectors.hostedBy(hostedBy)}`)
              }
            >
              {hostedByPicture ? (
                <img alt="..." src={hostedByPicture} />
              ) : (
                <i className="ni ni-circle-08 text-lg" />
              )}
            </a>
            <Col className="text-muted pl-2">
              <span
                className="text-xs text-muted hover-pointer"
                onClick={(e) =>
                  history.push(`/trainer?id=${selectors.hostedBy(hostedBy)}`)
                }
              >
                {selectors.hostedByName(hostedBy)}
              </span>
              <span className="text-xs text-muted">
                {" "}
                {`| Rating: ${courseRating} `}
                <i class="fas fa-star" />
              </span>
            </Col>
          </Row>
        </CardTitle>
        <CardText>{truncate(description)}</CardText>
        <Row className="mx-2">
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
            <span className="btn-inner--text">Read More...</span>
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
              <span className="btn-inner--text">Interested</span>
            </Button>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  );
}

CourseCard.propTypes = {};

export default memo(CourseCard);
