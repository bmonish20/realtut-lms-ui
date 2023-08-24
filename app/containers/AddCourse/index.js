/**
 *
 * AddCourse
 *
 */

import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { connect, useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Spinner,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import Select2 from "react-select2-wrapper";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import AlertPopupHandler from "components/AlertPopup/AlertPopupHandler";
import TextEditor from "components/TextEditor";
import RtInput from "components/RtInput/index";
import RtUpload from "../../components/RtUploadFile";
import Chapter from "../../components/Cards/Chapter";
import { Quiz } from "../../components/Cards/Quiz";
import AddLesson from "../AddLesson";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import moment from "moment-timezone";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./addCourseStyle.scss";

export default function AddCourse() {
  useInjectReducer({ key: "addCourse", reducer });
  const dispatch = useDispatch();
  const {
    title,
    type,
    startDate,
    duration,
    shortDescription,
    description,
    tags,
    isSubmitting,
    validations,
    isEdit,
    languages,
    prerequisite,
    chapters,
    quizzes,
    imgUrl,
    imgData,
  } = useSelector((state) => ({
    title: selectors.title(state),
    type: selectors.type(state),
    startDate: selectors.startDate(state),
    duration: selectors.duration(state),
    shortDescription: selectors.summary(state),
    description: selectors.description(state),
    languages: selectors.languages(state),
    prerequisite: selectors.prerequisite(state),
    tags: selectors.tags(state),
    isSubmitting: selectors.isSubmitting(state),
    validations: selectors.validationError(state),
    isEdit: selectors.isEdit(state),
    chapters: selectors.chapters(state),
    quizzes: selectors.quizzes(state),
    imgUrl: selectors.imgUrl(state),
    imgData: selectors.imgData(state),
  }));

  const availableChapters = useSelector((state) =>
    selectors.availableChapters(state)
  );

  const availableQuizzes = useSelector((state) =>
    selectors.availableQuizzes(state)
  );

  let courseTypeRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(operations.fetchChapters());
    dispatch(operations.fetchQuizzes());
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchCourse(id));
    }
    return () => dispatch(operations.addCourseInit());
  }, []);

  const onSelect = () => {
    if (courseTypeRef.el != undefined) {
      dispatch(operations.changeType(courseTypeRef.el.val()));
    }
  };

  const onChapterSelect = (e) => {
    dispatch(
      operations.appendChapter({
        id: e.value,
        title: e.label,
      })
    );
  };

  const onQuizSelect = (e) => {
    dispatch(
      operations.appendQuiz({
        id: e.value,
        title: e.label,
      })
    );
  };

  const onAddLesson = () => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-md",
      ChildTag: AddLesson,
      ChildProps: {
        postAdd: (payload) => {
          dispatch(operations.appendChapter(payload));
          dispatch(operations.fetchChapters());
        },
        isPopup: true,
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onEditLesson = (id, index) => {
    AlertPopupHandler.openCustom({
      text: "",
      data: {},
      title: "",
      warning: true,
      customClass: "text-sm",
      ChildTag: AddLesson,
      ChildProps: {
        postAdd: (payload) => {
          dispatch(operations.editChapter({ index, ...payload }));
        },
        id,
        isPopup: true,
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
        operations.OnEdit(
          id,
          {
            title,
            type,
            startDate,
            duration,
            shortDescription,
            description,
            languages,
            prerequisite,
            tags,
            chapters,
            quizzes,
          },
          imgData
        )
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            title,
            type,
            startDate,
            duration,
            shortDescription,
            description,
            languages,
            prerequisite,
            tags,
            chapters,
            quizzes,
          },
          imgData
        )
      );
    }
  };

  const getSubmitButton = () => {
    if (isSubmitting)
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
          <span className="btn-inner-text">
            {isEdit ? "Save/Edit Course" : "Add Course"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Course" : "Add Course"}
      </Button>
    );
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDates = (current) => {
    return current.isAfter(yesterday);
  };

  return (
    <div className="addCourse mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>AddCourse</title>
        <meta name="description" content="Description of AddCourse" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Course" : "Add an Course"}
          </div>
        </Col>
      </Row>
      <Row className="mb-3 mx-3">
        <Col sm="1">
          {imgUrl ? (
            <img width="100%" alt="..." src={imgUrl} />
          ) : (
            <img src={require("assets/img/icons/common/course.svg")} />
          )}
        </Col>
        <Col sm="3">
          <RtUpload
            name="profile-img"
            onChange={(e) => dispatch(operations.uploadImage(e))}
            labelText="Upload a new photo"
            value=""
            className=""
          />
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Course Title</Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeTitle(e))}
              type="text"
              placeholder="Enter Course Title"
              error={validations}
              name="title"
              value={title}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="courseType" sm={2}>
            Course Type
          </Label>
          <Col sm={6}>
            <Select2
              className="form-control"
              ref={(e) => {
                courseTypeRef = e;
              }}
              data={[
                { id: "live", text: "Live" },
                { id: "recurring", text: "Recurring" },
                { id: "biWeekly", text: "Bi-Weekly" },
                { id: "monthly", text: "Monthly" },
              ]}
              options={{
                placeholder: "Select a Course Type",
              }}
              value={type}
              onChange={(e) => onSelect(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startDate" sm={2}>
            Expected Start Date
          </Label>
          <Col sm="6" md="2">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Date & Time",
                }}
                dateFormat="DD/MM/YYYY"
                timeFormat="hh:mm:ss A"
                isValidDate={disablePastDates}
                onChange={(e) => dispatch(operations.changeStartDate(e))}
                value={startDate}
              />
            </InputGroup>
          </Col>
          <Label for="summary" sm="2" className="text-left text-lg-right">
            Class Duration
          </Label>
          <Col sm="6" md="2">
            <RtInput
              onChange={(e) => dispatch(operations.changeDuration(e))}
              type="text"
              placeholder="Duration in Hrs"
              error={validations}
              name="duration"
              value={duration}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="summary" sm={2}>
            Summary
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={(e) => dispatch(operations.changeSummary(e))}
              type="textarea"
              placeholder="Enter a short summary"
              error={validations}
              name="shortDescription"
              value={shortDescription}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Prerequisites
          </Label>
          <Col sm={6}>
            <TextEditor
              name="prerequisite"
              theme="snow"
              placeholder="Enter Course Prerequisites"
              value={prerequisite}
              error={validations}
              onChange={(e) => dispatch(operations.changePrerequisete(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={6}>
            <TextEditor
              name="description"
              theme="snow"
              placeholder="Enter Course Description"
              value={description}
              error={validations}
              onChange={(e) => dispatch(operations.changeDescription(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="tags" sm={2}>
            Tags
          </Label>
          <Col sm={6}>
            <CreatableSelect
              options={[
                { value: "React", label: "React" },
                { value: "Angular", label: "Angular" },
                { value: "AWS", label: "AWS" },
                { value: "DataScience", label: "Data Science" },
                { value: "Mongo", label: "Mongo" },
              ]}
              value={tags}
              isMulti
              onChange={(e) => dispatch(operations.changeTags(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lessons" sm={2}>
            Lessons
          </Label>
          <Col sm={3}>
            <ReactSelect
              options={availableChapters}
              placeholder="Search lesson"
              value={null}
              onChange={(e) => onChapterSelect(e)}
            />
          </Col>
          <Col sm={3} className="mt-3 mt-md-0">
            <Button
              color="primary"
              className="btn-icon btn-3"
              type="button"
              onClick={() => onAddLesson()}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-plus" />
              </span>
              <span className="btn-inner--text">Add Lesson</span>
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={4}>
            {chapters.map(({ id, title }, index) => (
              <div key={id}>
                <Chapter
                  title={title}
                  index={index}
                  id={id}
                  onEdit={(id) => onEditLesson(id, index)}
                  onDelete={(i) => dispatch(operations.removeChapter(i))}
                />
              </div>
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="quiz" sm={2}>
            Quizzes
          </Label>
          <Col sm={3}>
            <ReactSelect
              options={availableQuizzes}
              placeholder="Search quiz"
              value={null}
              onChange={(e) => onQuizSelect(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} />
          <Col sm={4}>
            {quizzes.map(({ id, title }, index) => (
              <div key={id}>
                <Quiz
                  title={title}
                  index={index}
                  id={id}
                  onDelete={(i) => dispatch(operations.removeQuiz(i))}
                />
              </div>
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddCourse.propTypes = {};
