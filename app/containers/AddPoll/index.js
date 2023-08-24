/**
 *
 * AddPoll
 *
 */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Form, FormGroup, Label, Button, Spinner } from "reactstrap";
import Poll from "react-polls";
import reducer from "./reducer";
import CreatableSelect from "react-select/creatable";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./addPollStyle.scss";
import RtInput from "../../components/RtInput/index";

export default function AddPoll({
  isAddPoll,
  pollId,
  pollQuestion,
  pollAnswers,
  courseId,
  onConfirm,
  onCancel,
}) {
  useInjectReducer({ key: "addPoll", reducer });
  const dispatch = useDispatch();
  const changeTitle = operations.changeTitle(dispatch);
  const changeOptions = operations.changeOptions(dispatch);
  const addPollInit = operations.addPollInit(dispatch);

  const { title, options, isLoading } = useSelector((state) => ({
    title: selectors.title(state),
    options: selectors.options(state),
    isLoading: selectors.isLoading(state),
  }));

  React.useEffect(() => {
    return () => addPollInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      operations.onSubmit(
        {
          title,
          options,
          courseId,
        },
        onConfirm
      )
    );
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="default" size="sm" disabled={true}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            className="btn-icon"
            disabled={true}
            size="sm"
          >
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">Add Poll</span>
          </Button>
        </>
      );

    return (
      <>
        <Button type="default" size="sm" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          color="primary"
          onClick={(e) => onSubmit(e)}
        >
          Add Poll
        </Button>
      </>
    );
  };

  const handleVote = (voteAnswer) => {
    dispatch(operations.submitPoll(pollId, pollAnswers, voteAnswer));
  };

  return (
    <div className="addPoll">
      <Helmet>
        <title>AddPoll</title>
        <meta name="description" content="Description of AddPoll" />
      </Helmet>
      <Row className="my-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isAddPoll ? "Add a Poll" : "Submit Poll"}
          </div>
        </Col>
      </Row>
      {isAddPoll ? (
        <Form role="form" onSubmit={(e) => onSubmit(e)}>
          <FormGroup row>
            <Label for="title" sm={3}>
              Poll Title
            </Label>
            <Col>
              <RtInput
                onChange={changeTitle}
                type="text"
                placeholder="Enter Poll Title"
                name="title"
                value={title}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="options" sm={3}>
              Options
            </Label>
            <Col>
              <CreatableSelect
                options={[]}
                value={options}
                isMulti
                onChange={(e) => changeOptions(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col className="mt-3">{getSubmitButton()}</Col>
          </FormGroup>
        </Form>
      ) : (
        ""
      )}
      {pollAnswers && !isAddPoll ? (
        <>
          <Poll
            question={pollQuestion}
            answers={pollAnswers}
            onVote={handleVote}
            customStyles={{ theme: "blue", questionBold: true }}
          />
          <Button type="default" size="sm" onClick={() => onCancel()}>
            Close
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

AddPoll.propTypes = {};
