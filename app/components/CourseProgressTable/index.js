/**
 *
 * CourseProgressTable
 *
 */

import React, { memo } from "react";
import {
  Progress,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import history from "utils/history";
import Skeleton from "react-loading-skeleton";
import "./courseProgressTableStyle.scss";

export function CourseProgressTableSkeleton() {
  return (
    <Card className="mx-3 w-100">
      <CardBody>
        <Skeleton count={3} />
      </CardBody>
    </Card>
  );
}

function CourseProgressTable({ courseProgress = [] }) {
  const getCourseProgressBody = () => {
    if (!courseProgress || courseProgress.length == 0) {
      return (
        <ListGroupItem>
          <Row className="text-sm text-muted justify-content-center">
            You haven't enrolled in courses.
          </Row>
        </ListGroupItem>
      );
    }

    return courseProgress.map(({ courseProgress, courseId }, index) => {
      return (
        <ListGroupItem key={index}>
          <Row className="d-flex flex-column">
            <Col
              className="text-md mb-2 hover-pointer"
              onClick={() =>
                history.push(
                  `/course/${courseId.id}/play?start=${courseProgress}`
                )
              }
            >
              {courseId.title}
            </Col>
            <Col>
              <Progress
                max={courseId.chapters.length}
                value={courseProgress}
                color="primary"
              />
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
  };

  return (
    <div className="CourseProgressTable w-100">
      <Card className="mx-3">
        <CardBody>
          <ListGroup className="list my--3" flush>
            {/* <tbody> */}
            {getCourseProgressBody()}
            {/* </tbody> */}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
}

CourseProgressTable.propTypes = {};

CourseProgressTable.defaultProps = {
  courseProgress: [],
};
export default memo(CourseProgressTable);
