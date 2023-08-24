/**
 *
 * PlayContent
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import "./playContentStyle.scss";

function PlayContent({
  chapter,
  isLoading
}) {

  const redirectToMeeting = () => {
    const isHost = 0;
    window.open(
      `/meeting/start?link=${chapter.link}&isHost=${isHost}`,
      "_blank");
  }

  if (isLoading) return <div className="playContent">
    <Card>
      <CardBody>
        <CardTitle>
          <Skeleton className="w-50"/>
        </CardTitle>
        <Skeleton count="10"/>
      </CardBody>
    </Card>
  </div>
  return <div className="playContent">
    <Card>
      <CardBody>
        <CardTitle className="text-primary h3">
          {chapter.title}
        </CardTitle>
        <Row className="justify-content-center mb-3 text-sm">
          This class is scheduled on Zoom.
        </Row>
        <Row className="justify-content-center">
          <Button
            color="primary"
            type="button"
            onClick={() => redirectToMeeting()}
          >
            Join Meeting
          </Button>
        </Row>
      </CardBody>
    </Card>
  </div>;
}

PlayContent.propTypes = {
  chapter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }),
  isLoading: PropTypes.bool.isRequired
};

export default memo(PlayContent);
