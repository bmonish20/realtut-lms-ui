/**
 *
 * QuizDetails
 *
 */

import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col } from "reactstrap";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./quizDetailsStyle.scss";

export default function QuizDetails() {
  useInjectReducer({ key: "quizDetails", reducer });
  const dispatch = useDispatch();
  const quizDetailsInit = operations.quizDetailsInit(dispatch);
  const { isLoading, quiz, questions } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    quiz: selectors.quiz(state),
    questions: selectors.questions(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchQuiz(id));
    }
    return () => quizDetailsInit();
  }, []);

  return (
    <div className="quizDetails  mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>QuizDetails</title>
        <meta name="description" content="Description of QuizDetails" />
      </Helmet>
      <Row className="mt-3">
        <Col xs="12">
          <span className="text-primary text-lg font-weight-bold">
            {quiz.title} |
          </span>
          <span className="text-muted">Duration: </span>
          <span className="font-weight-bold">{`${quiz.duration} mins`}</span>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <span className="text-muted">Course associated: </span>
          <span className="font-weight-bold">{quiz.forCourse}</span>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="font-weight-bold">Questions:</Col>
      </Row>
      {questions.map((question, index) => (
        <Row className="mt-3">
          <Col>{`${index + 1}. ${question.question.replace(
            /(<([^>]+)>)/gi,
            ""
          )}`}</Col>
        </Row>
      ))}
    </div>
  );
}

QuizDetails.propTypes = {};
