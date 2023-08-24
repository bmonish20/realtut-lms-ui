/**
 *
 * Question
 *
 */

import React, { memo } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import Tag from "../../Tag";
import Skeleton from "react-loading-skeleton";
// import styled from 'styled-components';

import "./questionStyle.scss";

export function QuestionSkeleton() {
  return (
    <div className="questionSkeleton">
      <Card>
        <CardBody>
          <Row className="mb-3">
            <Col xs="4">
              <Skeleton height={11} />
              <Skeleton height={10} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

function Question({ id, question, type, points, onDelete }) {
  const getOptions = () => (
    <>
      <Col className="text-right">
        <i
          className="far fa-trash-alt text-muted text-sm hover-pointer hover-color-danger"
          onClick={() => onDelete(id, question.replace(/(<([^>]+)>)/gi, ""))}
        />
      </Col>
    </>
  );

  return (
    <div className="question">
      <Card>
        <CardBody>
          <Row className="ml-1">
            <span className="h2 text-primary">
              {question.replace(/(<([^>]+)>)/gi, "")}
            </span>
            {getOptions()}
          </Row>
          <Row className="mt-2 ml-1">
            <span>
              <Tag title={type} className="text-sm" />
            </span>
            <span className="ml-2">
              <div
                className={`tag bg-primary
              px-2 py-1 rounded border border-primary`}
              >
                <div className="text-xs text-secondary">{`Points: ${points}`}</div>
              </div>
            </span>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

Question.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(Question);
