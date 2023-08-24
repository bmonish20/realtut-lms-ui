/**
 *
 * QuizForm
 *
 */

import React from "react";
import qs from "query-string";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { WebinarWatch } from "../../components/WebinarWatch";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getDifference } from "utils/dateTimeHelpers";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import TextEditor from "../../components/TextEditor";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import "./quizFormStyle.scss";

export default function QuizForm() {
  useInjectReducer({ key: "quizForm", reducer });
  const dispatch = useDispatch();
  const quizFormInit = operations.quizFormInit(dispatch);

  const { isLoading, response, quiz, questions } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    response: selectors.response(state),
    quiz: selectors.quiz(state),
    questions: selectors.questions(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchQuiz(id));
    }
    return () => quizFormInit();
  }, []);

  const onSubmit = (e) => {
    const quizId = qs.parse(location.search).id;
    dispatch(operations.onSubmit(quizId, { response, questions }));
  };

  var durationTime = quiz.duration * 60;

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button
          type="button"
          color="primary"
          className="btn-icon"
          disabled={true}
        >
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">Submit</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Submit
      </Button>
    );
  };

  const getAnswerField = (question, index) => {
    if (question.type == "Single Answer")
      return (
        <RtInput
          onChange={(e) => dispatch(operations.changeAnswer(e, index))}
          type="text"
          name="title"
          placeholder="Enter your answer"
        />
      );
    else if (question.type == "Essay")
      return (
        <RtInput
          onChange={(e) => dispatch(operations.changeAnswer(e, index))}
          type="textarea"
          name="title"
          placeholder="Enter your answer"
        />
      );
    else
      return (
        <>
          {question.mcqOptions.map((mcqOption) => (
            <div className="custom-control custom-radio mb-3">
              <input
                className="custom-control-input"
                id={mcqOption}
                name={question.question.replace(/(<([^>]+)>)/gi, "")}
                type="radio"
                value={mcqOption}
                onChange={(e) =>
                  dispatch(operations.changeAnswer(e.target.value, index))
                }
              />
              <label className="custom-control-label" htmlFor={mcqOption}>
                {mcqOption}
              </label>
            </div>
          ))}
        </>
      );
  };

  return (
    <div className="quizForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>QuizForm</title>
        <meta name="description" content="Description of QuizForm" />
      </Helmet>
      <Row className="mt-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">{quiz.title}</div>
        </Col>
      </Row>
      {durationTime ? (
        <Row className="sticky-top">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <CountdownCircleTimer
              isPlaying
              duration={durationTime}
              size={120}
              strokeWidth={0}
              colors={[["#5e72e4", 1]]}
              onComplete={() => onSubmit()}
            >
              {({ remainingTime }) => {
                const hours = Math.floor(remainingTime / 3600)
                  .toString()
                  .padStart(2, "0");
                const minutes = Math.floor((remainingTime % 3600) / 60)
                  .toString()
                  .padStart(2, "0");
                const seconds = (remainingTime % 60)
                  .toString()
                  .padStart(2, "0");

                return (
                  <>
                    <Row className="text-s text-monospace font-weight-bold">
                      <div className="mr-1">{hours}</div>:
                      <div className="mx-1">{minutes}</div>:
                      <div className="ml-1">{seconds}</div>
                    </Row>
                  </>
                );
              }}
            </CountdownCircleTimer>
          </div>
        </Row>
      ) : (
        <div>Timer</div>
      )}
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        {questions.map((question, index) => (
          <FormGroup row>
            <Col sm={6}>
              <Label>{question.question.replace(/(<([^>]+)>)/gi, "")}</Label>
              {getAnswerField(question, index)}
            </Col>
          </FormGroup>
        ))}
        <FormGroup row>
          <Col>{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

QuizForm.propTypes = {};
