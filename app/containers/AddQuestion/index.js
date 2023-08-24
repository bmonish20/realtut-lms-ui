import React from "react";
import qs from "query-string";
import _get from "lodash/get";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import { Row, Col, Form, FormGroup, Label, Button, Spinner } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import TextEditor from "components/TextEditor";
import RtInput from "../../components/RtInput/index";
import "./addQuestionStyle.scss";
import RtReactSelect from "../../components/RtReactSelect";

export default function AddQuestion({ id, postAdd, onConfirm, onCancel }) {
  useInjectReducer({ key: "addQuestion", reducer });
  const dispatch = useDispatch();
  const changeQuestion = operations.changeQuestion(dispatch);
  const changeType = operations.changeType(dispatch);
  const changeMcqOptions = operations.changeMcqOptions(dispatch);
  const changePoints = operations.changePoints(dispatch);
  const addQuestionInit = operations.addQuestionInit(dispatch);

  const {
    question,
    type,
    mcqOptions,
    points,
    isLoading,
    validationError,
    isEdit,
  } = useSelector((state) => ({
    question: selectors.question(state),
    type: selectors.type(state),
    mcqOptions: selectors.mcqOptions(state),
    points: selectors.points(state),
    isLoading: selectors.isLoading(state),
    validationError: selectors.validationError(state),
    isEdit: selectors.isEdit(state),
  }));

  React.useEffect(() => {
    return () => addQuestionInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editQuestion(
          id,
          {
            question,
            type: _get(type, "value", ""),
            mcqOptions,
            points,
          },
          postAdd,
          onConfirm
        )
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            question,
            type: _get(type, "value", ""),
            mcqOptions,
            points,
          },
          postAdd,
          onConfirm
        )
      );
    }
  };

  const getOptionsComponent = () => {
    if (type != null && type.value == "Multiple Choice")
      return (
        <FormGroup row>
          <Label for="exampleSelect" sm={3}>
            MCQ Options
          </Label>
          <Col>
            <CreatableSelect
              options={[]}
              value={mcqOptions}
              isMulti
              onChange={(e) => changeMcqOptions(e)}
            />
          </Col>
        </FormGroup>
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
            <span className="btn-inner-text">
              {isEdit ? "Save/Edit Question" : "Add Question"}
            </span>
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
          {isEdit ? "Save/Edit Question" : "Add Question"}
        </Button>
      </>
    );
  };

  return (
    <div className="addQuestion">
      <Helmet>
        <title>AddQuestion</title>
        <meta name="description" content="Description of AddQuestion" />
      </Helmet>
      <Row className="my-3">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Question" : "Add a Question"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label for="description" sm={3}>
            Question
          </Label>
          <Col>
            <TextEditor
              name="question"
              theme="snow"
              placeholder="Enter Question"
              value={question}
              error={validationError}
              onChange={changeQuestion}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={3}>
            Type
          </Label>
          <Col>
            <RtReactSelect
              options={[
                { value: "Multiple Choice", label: "Multiple Choice" },
                { value: "Essay", label: "Essay" },
                { value: "Single Answer", label: "Single Answer" },
              ]}
              placeholder="Question Type"
              error={validationError}
              value={type}
              name="type"
              onChange={(e) => changeType(e)}
            />
          </Col>
        </FormGroup>
        {getOptionsComponent()}
        <FormGroup row>
          <Label for="exampleText" sm={3}>
            Points
          </Label>
          <Col>
            <RtInput
              onChange={changePoints}
              type="text"
              placeholder="Enter points"
              error={validationError}
              name="points"
              value={points}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          {/* <Col>{getErrorComponent()}</Col> */}
        </FormGroup>
      </Form>
    </div>
  );
}

AddQuestion.propTypes = {};
