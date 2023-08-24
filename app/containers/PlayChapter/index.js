/**
 *
 * PlayChapter
 *
 */

import React from "react";
import qs from "query-string";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
} from "reactstrap";
import { Helmet } from "react-helmet";
import PlayContent from "../../components/Cards/PlayContent";
import history from "../../utils/history";
import { useCookies } from "react-cookie";
import StepProgressBar from "../../components/StepProgressBar";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import { getSteps } from "./helpers";
import "./playChapterStyle.scss";

export default function PlayChapter({ match, location, ...rest }) {
  useInjectReducer({ key: "playChapter", reducer });
  const dispatch = useDispatch();
  const state = useSelector((state) => selectors.all(state));
  const [cookie] = useCookies(["user"]);

  React.useEffect(() => {
    const { id } = match.params;
    const chapter = parseInt(qs.parse(location.search).start) || 0;
    if (id !== null) {
      dispatch(operations.fetchCourse(id, chapter, cookie.user.id));
    }

    return () => dispatch(operations.initPage());
  }, []);

  const getChapterComponent = (chapter) => {
    if (chapter && chapter.chapterType == "chapter") {
      return <PlayContent chapter={chapter} isLoading={state.isLoading} />;
    } else if (chapter && chapter.chapterType == "quiz") {
      return (
        <Card className="text-center">
          <CardBody>
            <div className="mb-3 text-primary h2">{chapter.title}</div>
            <p>{`${chapter.duration} mins | ${
              chapter.questions.length
            } questions`}</p>
            {!chapter.quizResponseId ? (
              <Button
                color="primary"
                className="btn-icon btn-3 text-center"
                type="button"
                onClick={(e) =>
                  history.push(
                    `/quiz-form?id=${state.chapters[state.resumeFrom].id}`
                  )
                }
              >
                Start Quiz
              </Button>
            ) : (
              ""
            )}

            {chapter.quizResponseId && chapter.response[0].mark ? (
              <Button
                color="primary"
                className="btn-icon btn-3 text-center"
                type="button"
                onClick={(e) =>
                  history.push(
                    `/quiz-form?id=${state.chapters[state.resumeFrom].id}`
                  )
                }
              >
                Re-Take Quiz
              </Button>
            ) : (
              ""
            )}

            {chapter.quizResponseId ? (
              <Button
                color="primary"
                className="btn-icon btn-3 text-center"
                type="button"
                onClick={(e) =>
                  history.push(`/quiz-score?id=${chapter.quizResponseId}`)
                }
              >
                View Score
              </Button>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      );
    }
  };

  const getComponent = () => (
    <>
      <StepProgressBar
        className="my-3"
        steps={getSteps(state.chapters, (payload) =>
          dispatch(operations.playChapter(match.params.id, payload))
        )}
        progress={state.resumeFrom}
      />
      {getChapterComponent(state.chapters[state.resumeFrom])}
      <Card>
        <CardHeader className="text-primary h2">{state.title}</CardHeader>
        <CardBody>
          <Row className="mx-2 mb-3">
            <a
              className="avatar avatar-sm rounded-circle"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {state.hostedByPictureUrl ? (
                <img alt="..." src={state.hostedByPictureUrl} />
              ) : (
                <i className="ni ni-circle-08 text-xl" />
              )}
            </a>
            <Col xs="9" md="9" className="ml-3 text-muted">
              <Row className="font-weight-bold">{state.hostedBy}</Row>
              <Row className="text-xs">{"Host"}</Row>
            </Col>
          </Row>
          <CardText className="text-sm">{state.shortDescription}</CardText>
        </CardBody>
      </Card>
    </>
  );

  return (
    <div className="playChapter mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>PlayChapter</title>
        <meta name="description" content="Description of PlayChapter" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="9">
          {getComponent()}
        </Col>
      </Row>
    </div>
  );
}

PlayChapter.propTypes = {};
