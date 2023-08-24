import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useInjectReducer } from "utils/injectReducer";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
  Card,
  CardHeader,
} from "reactstrap";
import reducer from "./reducer";
import ReactSelect from "react-select";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";
import AddQuestion from "../AddQuestion/";
import ContentViewer from "../../components/ContentViewer";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import "./addQuizStyle.scss";

export default function AddQuiz({ location }) {
  useInjectReducer({ key: "addQuizPage", reducer });
  const dispatch = useDispatch();
  const changeTitle = operations.changeTitle(dispatch);
  const changeForCourse = operations.changeForCourse(dispatch);
  const changeDuration = operations.changeDuration(dispatch);
  const changeQuestions = operations.changeQuestions(dispatch);
  const addQuizInit = operations.addQuizInit(dispatch);

  const {
    title,
    forCourse,
    duration,
    questions,
    availableQuestions,
    isLoading,
    validations,
    isEdit,
  } = useSelector((state) => ({
    title: selectors.title(state),
    forCourse: selectors.forCourse(state),
    duration: selectors.duration(state),
    questions: selectors.questions(state),
    availableQuestions: selectors.availableQuestions(state),
    isLoading: selectors.isLoading(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchQuestions());
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => addQuizInit();
  }, []);

  const onQuestionSelect = (e) => {
    dispatch(
      operations.appendQuestion({
        id: e.value,
        question: e.label,
      })
    );
  };

  const onAddQuestion = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: AddQuestion,
      ChildProps: {
        postAdd: (payload) => {
          dispatch(operations.fetchQuestions());
          changeQuestions([...new Set([...questions, payload])]);
        },
      },
      showConfirm: false,
      showCancel: false,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editQuiz(id, {
          title,
          forCourse,
          duration,
          questions,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          title,
          forCourse,
          duration,
          questions,
        })
      );
    }
  };

  const getSelectedQuestions = () => {
    return questions.map(({ id, question }, index) => (
      <Row key={index}>
        <Card>
          <CardHeader>
            <Row>
              <Col xs="auto">
                <ContentViewer className="text-left" content={question} />
              </Col>
              <Col className="text-right">
                <i
                  className="fas fa-times text-muted text-sm hover-pointer hover-color-danger text-right"
                  onClick={() =>
                    dispatch(operations.removeQuestion({ index, id, question }))
                  }
                />
              </Col>
            </Row>
          </CardHeader>
        </Card>
      </Row>
    ));
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Row className="mt-3">
          <div className="align-items-right ml-auto mr-3 mr-md-5">
            <Button
              type="button"
              color="primary"
              className="btn-icon"
              disabled={true}
            >
              <span className="btn-inner-icon">
                <Spinner size="sm" className="mr-2" />
              </span>
              <span className="btn-inner-text">
                {isEdit ? "Save/Edit Quiz" : "Add Quiz"}
              </span>
            </Button>
          </div>
        </Row>
      );
    return (
      <Row>
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={(e) => onSubmit(e)}
          >
            {isEdit ? "Save/Edit Quiz" : "Add Quiz"}
          </Button>
        </div>
      </Row>
    );
  };

  return (
    <div className="addQuiz mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>AddQuiz</title>
        <meta name="description" content="Description of AddQuiz" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="10">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Quiz" : "Add a Quiz"}
          </div>
        </Col>
        <Col>{getSubmitButton()}</Col>
      </Row>

      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row />
        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeTitle}
              type="text"
              placeholder="Enter Quiz Title"
              error={validations}
              name="title"
              value={title}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>For Course</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeForCourse}
              type="text"
              placeholder="Enter Course Associated"
              error={validations}
              name="forCourse"
              value={forCourse}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Duration</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeDuration}
              type="text"
              placeholder="Enter Quiz Duration in minutes"
              error={validations}
              name="duration"
              value={duration}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Questions</Label>
          <Col sm={6}>
            <ReactSelect
              options={availableQuestions}
              placeholder="Search Questions"
              value={null}
              onChange={(e) => onQuestionSelect(e)}
            />
          </Col>
        </FormGroup>
      </Form>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => onAddQuestion()}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Question</span>
          </Button>
        </Col>
      </Row>
      {getSelectedQuestions()}
    </div>
  );
}

AddQuiz.propTypes = {};
