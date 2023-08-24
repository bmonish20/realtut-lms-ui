import React from "react";
import qs from "query-string";
import { merge } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner,
} from "reactstrap";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import "./reviewStyle.scss";

export default function Review() {
  useInjectReducer({ key: "review", reducer });
  const dispatch = useDispatch();
  const { quizId, attendedBy, response, isLoading, validations } = useSelector(
    (state) => ({
      quizId: selectors.quizId(state),
      attendedBy: selectors.attendedBy(state),
      response: selectors.response(state),
      isLoading: selectors.isLoading(state),
      validations: selectors.validations(state),
    })
  );

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchReview(id));
    }
    return () => dispatch(operations.reviewPageInit());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const id = qs.parse(location.search).id;
    dispatch(
      operations.onSubmit(
        id,
        {
          response,
          quizId: quizId.id,
          attendedBy: attendedBy._id,
        },
        quizId.questions
      )
    );
  };

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
          <span className="btn-inner-text">Save Review</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        Save Review
      </Button>
    );
  };

  const getComponent = () => {
    return response.map((each, index) => (
      <>
        <Row className="mt-3" key={index}>
          <Card className="mx-3 w-100">
            <CardHeader>
              <Row>
                <Col>
                  <Row className="text-primary text-lg">
                    <Col>{each.questionName}</Col>
                  </Row>
                  <Row className="text-xs text-muted mt-4">
                    <Col>Answer:</Col>
                  </Row>
                  <Row>
                    <Col>{each.answer}</Col>
                  </Row>
                </Col>
                <Col>
                  <div className="mt-3">
                    <RtInput
                      onChange={(e) =>
                        dispatch(operations.changeMark(e, index))
                      }
                      type="text"
                      placeholder="Enter Mark"
                      name={`response[${index}].mark`}
                      error={validations}
                      value={response[index].mark}
                    />
                  </div>
                  <div className="mt-3 mb-3">
                    <RtInput
                      onChange={(e) =>
                        dispatch(operations.changeComment(e, index))
                      }
                      type="textarea"
                      placeholder="Enter Feedback (Optional)"
                      name={`response[${index}].comment`}
                      value={response[index].comment}
                      error={validations}
                    />
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Row>
      </>
    ));
  };

  return (
    <div className="review mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Review</title>
        <meta name="description" content="Description of Review" />
      </Helmet>
      <Row className="mt-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {quizId ? quizId.title : "Loading..."}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-muted">
          attended by {attendedBy ? attendedBy.name : "Loading..."}
        </Col>
      </Row>
      {getComponent()}
      <Row>
        <Col className="mt-3 mb-3">{getSubmitButton()}</Col>
      </Row>
    </div>
  );
}

Review.propTypes = {};
