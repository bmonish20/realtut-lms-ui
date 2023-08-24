/**
 *
 * ArticleCard
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import _debounce from "lodash/debounce";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import { ContentPreview } from "../../ContentViewer";
import { useCookies } from "react-cookie";
import Can from "../../Can";
import { parseDate } from "utils/dateTimeHelpers";
import history from "utils/history";
import * as selectors from "./selectors";
import { permissions } from "utils/permissions";
import "./articleCardStyle.scss";

export function ArticleCardLoading() {
  return <>
    <Card>
      <CardTitle className="px-4 mt-3">
        <Skeleton />
        <Row>
          <Col sm="1" className="text-right ml-2">
            <Skeleton circle={true} height={25} width={25} />
          </Col>
          <Col>
            <Skeleton className="w-50"/>
          </Col>
        </Row>
      </CardTitle>
      <CardBody>
        <Skeleton count={4} />
        <div className="mt-4"/>
        <Row>
          <Col>
            <Skeleton className="w-50"/>
          </Col>
          <Col className="text-right">
            <Skeleton className="w-25"/>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </>
}

function ArticleCard({
  id,
  title,
  description,
  createdAt,
  readDurationInMins,
  writtenBy,
  onEdit,
  onDelete,
  liked,
  likes,
  onLike,
  onUnlike,
  imageUrl = require("assets/img/icons/common/course.svg"),
}) {
  const [cookie] = useCookies(['user']);
  const date = parseDate(createdAt, "MMM YYYY");
  const writtedByPicture = selectors.writtedByPicture(writtenBy);

  const delayedLike = _debounce(onLike, 250);
  const delayedUnLike = _debounce(onUnlike, 250);

  const getOptions = (isOwner = false) => (
    <>
      <Col className="text-right mt-2">
        <Can permissions={[
            permissions.EDIT_ALL_ARTICLE,
            {
              permission: permissions.EDIT_MY_ARTICLE,
              value: isOwner
            }
          ]}>
            <i
              className="far fa-edit text-muted text-sm hover-pointer hover-color-primary mr-2"
              onClick={() => onEdit(id)}
            />
          </Can>
          <Can permissions={[
            permissions.DELETE_ALL_ARTICLE,
            {
              permission: permissions.DELETE_MY_ARTICLE,
              value: isOwner
            }
          ]}>
            <i
              className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
              onClick={() => onDelete(id, title)}
            />
          </Can>
        </Col>
    </>
  );

  return <div className="articleCard">
    <Card>
      {getOptions(selectors.getUserId(cookie) == selectors.writtenById(writtenBy))}
      <div className="text-center mt-3">
        <CardImg
          className="px-1 py-2 w-50"
          alt=""
          src={imageUrl || require("assets/img/icons/common/course.svg")}
          top
        />
      </div>
      <CardBody>
        <CardTitle>
          <Row className="ml-1">
            <strong className="text-lg hover-pointer text-primary" onClick={() => history.push(`/resource/${id}`)}>{title}</strong>
          </Row>
          <Row className="mx-2 mt-2">
            <a
              className="avatar avatar-xs rounded-circle  hover-pointer"
              onClick={(e)=>history.push(`/trainer?id=${selectors.writtenById(writtenBy)}`)}
            >
              {writtedByPicture ?
                <img alt="..." src={writtedByPicture} />
                :
                <i className="ni ni-circle-08 text-lg" />
              }
            </a>
            <Col className="text-muted pl-2" >
              <span className="text-xs text-muted hover-pointer" onClick={(e)=>history.push(`/trainer?id=${selectors.writtenById(writtenBy)}`)}>{selectors.writtenBy(writtenBy)}</span>
            </Col>
          </Row>
        </CardTitle>
        <ContentPreview
          content={description}
          className="text-sm hover-pointer"
          onClick={() => history.push(`/resource/${id}`)}
        />
        <Row className="mx-2 mt-3">
          <span className="text-xs text-muted">{date}</span>
          <span className="text-xs text-muted ml-2">.</span>
          <span className="text-xs text-muted ml-2">
            {readDurationInMins} min read
          </span>
          <Col className="text-right">
            {
              liked ?
                <span className="hover-pointer" onClick={() => delayedUnLike(id)}>
                  <i className="text-primary fas fa-thumbs-up"/>
                  <span className="text-sm text-primary ml-1">{likes}</span>
                </span>
              :
                <span className="hover-pointer" onClick={() => delayedLike(id)}>
                  <i className="text-primary far fa-thumbs-up"/>
                  <span className="text-sm text-primary ml-1">{likes}</span>
                </span>
            }
          </Col>
        </Row>
      </CardBody>
    </Card>
  </div>;
}

ArticleCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  readDurationInMins: PropTypes.number,
  writtenBy: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  liked: PropTypes.bool,
  likes: PropTypes.number,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired
};

ArticleCard.defaultProps = {
  writtenBy: 'a few',
  liked: false
}

export default memo(ArticleCard);
