/**
 *
 * Chapter
 *
 */

import React, { memo } from "react";
import {
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./chapterStyle.scss";

function Chapter({
  title,
  id,
  index,
  onDelete,
  onEdit
}) {
  return <Card className="chapter">
    <CardBody>
      <Row className="pl-2 text-sm text-primary">
        <Col sm="1">
          <i className="fas fa-bars text-primary" />
        </Col>
        {title}
        <Col className="text-right">
          <i 
            className="far fa-edit text-muted text-sm hover-pointer mr-2"
            onClick={() => onEdit(id)}
          />
          <i 
            className="far fa-trash-alt text-muted text-sm hover-pointer"
            onClick={() => onDelete({ index, id, title })}
          />
        </Col>
      </Row>
    </CardBody>
  </Card>;
}

Chapter.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default memo(Chapter);
