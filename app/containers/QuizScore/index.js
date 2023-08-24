/**
 *
 * QuizScore
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./quizScoreStyle.scss";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner,
} from "reactstrap";

export default function QuizScore() {
  useInjectReducer({ key: "quizScore", reducer });
  const dispatch = useDispatch();
  const { quizId, attendedBy, response, isLoading, totalScore } = useSelector(
    (state) => ({
      quizId: selectors.quizId(state),
      attendedBy: selectors.attendedBy(state),
      response: selectors.response(state),
      totalScore: selectors.totalScore(state),
      isLoading: selectors.isLoading(state),
    })
  );

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchReview(id));
    }
    return () => dispatch(operations.quizScorePageInit());
  }, []);

  const getComponent = () => {
    return response.map((item, index) => (
      <Row className="mt-3" key={index}>
        <Card className="mx-3 w-50">
          <CardHeader>
            <Row>
              <Col md="6">
                <Row className="text-primary text-lg">
                  <Col>{item.questionName}</Col>
                </Row>
                <Row className="text-xs text-muted mt-4">
                  <Col>Answer:</Col>
                </Row>
                <Row>
                  <Col>{item.answer}</Col>
                </Row>
              </Col>
              <Col md="6">
                <div className="mt-3">
                  {`Score: ${
                    response[index].mark ? response[index].mark : "Not Scored"
                  }`}
                </div>
                <div className="mt-3 mb-3">{`Comment: ${
                  response[index].comment ? response[index].comment : "-"
                }`}</div>
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Row>
    ));
  };

  return (
    <div className="quizScore mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>QuizScore</title>
        <meta name="description" content="Description of QuizScore" />
      </Helmet>
      <Row className="mt-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {quizId ? quizId.title : "Loading..."} | Total Score:{" "}
            {totalScore ? totalScore : "NA"}
          </div>
          <div className="text-primary text-lg text-right font-weight-bold" />
        </Col>
      </Row>
      {getComponent()}
    </div>
  );
}

QuizScore.propTypes = {};
