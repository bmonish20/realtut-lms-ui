import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import QuizCard, { QuizCardSkeleton } from "../../components/Cards/Quiz";
import Can from "components/Can";
import { permissions } from "utils/permissions";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import { useCookies } from "react-cookie";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./quizzesStyle.scss";

export default function Quizzes() {
  useInjectReducer({ key: "quizzes", reducer });
  const dispatch = useDispatch();
  const { isLoading, quizzes } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    quizzes: selectors.quizzes(state),
  }));
  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    const myQuiz = qs.parse(location.search).my;
    if (myQuiz) {
      dispatch(operations.fetchMyQuizzes());
    } else {
      dispatch(operations.fetchQuizzes(cookie.user.id));
    }
  }, [location.search]);

  const onDelete = (id, quizName) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteOneQuiz(id, quizName)),
      confirmBtnText: "Delete",
      text: `You are about to delete "${quizName}". Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onEdit = (id) => {
    history.push(`/add-quiz?id=${id}`);
  };

  const onReview = (id) => {
    history.push(`/reviews?id=${id}`);
  };

  const onViewScore = (id) => {
    history.push(`/quiz-score?id=${id}`);
  };

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4">
            <QuizCardSkeleton />
          </Col>
          <Col xs="12" md="4">
            <QuizCardSkeleton />
          </Col>
        </>
      );
    return quizzes.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Col xs="12" md="6" lg="4" key={index}>
            <QuizCard
              key={index}
              id={item.id}
              quizName={item.title}
              forCourse={item.forCourse}
              createdBy={item.createdBy}
              totalScore={item.totalScore}
              quizResponse={item.quizResponseId}
              onViewScore={onViewScore}
              onDelete={onDelete}
              onEdit={onEdit}
              onReview={onReview}
            />
          </Col>
          {(index + 1) % 3 === 0 ? (
            <div key={`${item.id}-${index}`} className="w-100" />
          ) : null}
        </React.Fragment>
      );
    });
  };
  return (
    <div className="tasks mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Quizzes</title>
        <meta name="description" content="Tasks Page" />
      </Helmet>
      <Can permissions={[permissions.ADD_A_QUIZ]}>
        <Row className="mt-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => history.push("/add-quiz")}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Quiz</span>
            </Button>
          </div>
        </Row>
      </Can>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

Quizzes.propTypes = {};
