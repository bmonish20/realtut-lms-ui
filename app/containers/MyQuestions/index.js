/**
 *
 * MyQuestions
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";
import Question, { QuestionSkeleton } from "../../components/Cards/Question";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./myQuestionsStyle.scss";

export default function MyQuestions() {
  useInjectReducer({ key: "myQuestions", reducer });
  const dispatch = useDispatch();
  const { isLoading, questions } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    questions: selectors.questions(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchQuestions());
  }, []);

  const onDelete = (id, question) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: "Delete",
      text: (
        <>
          You are about to delete{" "}
          <span className="font-weight-bold font-italic">{question}</span>. Do
          you want to continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };
  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4">
            <QuestionSkeleton />
          </Col>
          <Col xs="12" md="4">
            <QuestionSkeleton />
          </Col>
        </>
      );
    return questions.map(({ id, question, type, points }, index) => (
      <React.Fragment key={id}>
        <Col xs="12" md="6" lg="4">
          <Question
            id={id}
            question={question}
            type={type}
            points={points}
            onDelete={onDelete}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${id}-${index}`} className="w-100" />
        ) : null}
      </React.Fragment>
    ));
  };
  return (
    <div className="myQuestions mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>My Questions</title>
        <meta name="description" content="Description of MyQuestions" />
      </Helmet>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

MyQuestions.propTypes = {};
