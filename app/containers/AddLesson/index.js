/**
 *
 * AddLesson
 *
 */

import React from "react";
import _get from "lodash/get";
import cs from "classnames";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Form, FormGroup, Label, Button, Spinner } from "reactstrap";
import RtInput from "components/RtInput/index";
import RtReactSelect from "../../components/RtReactSelect";
import ReactDatetime from "react-datetime";
import CreatableSelect from "../../components/RtCreatableSelect";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import reducer from "./reducer";
import * as operations from "./actions";
import * as selectors from "./selectors";
import "./addLessonStyle.scss";

export default function AddLesson({
  id,
  postAdd = () => ({}),
  onConfirm = () => history.push("/my-lessons"),
  onCancel = () => history.push("/my-lessons"),
  isPopup = false,
}) {
  useInjectReducer({ key: "addLesson", reducer });
  const dispatch = useDispatch();
  const {
    title,
    type,
    level,
    link,
    dateTime,
    tags,
    validations,
    isSubmitting,
    isEdit,
    recurrence,
    recurrenceType,
  } = useSelector((state) => ({
    title: selectors.title(state),
    type: selectors.type(state),
    level: selectors.level(state),
    link: selectors.link(state),
    dateTime: selectors.dateTime(state),
    tags: selectors.tags(state),
    validations: selectors.validations(state),
    isSubmitting: selectors.isSubmitting(state),
    isEdit: selectors.isEdit(state),
    recurrence: selectors.recurrence(state),
    recurrenceType: selectors.recurrenceType(state),
  }));

  const onSubmit = () => {
    const chapterId = id || qs.parse(location.search).chapterId;
    if (isEdit) {
      dispatch(
        operations.onEdit(
          chapterId,
          {
            title,
            type: _get(type, "value", ""),
            recurrence,
            link,
            level: _get(level, "value", ""),
            dateTime,
            tags: [...tags.map((tag) => tag.value)],
          },
          postAdd,
          onConfirm
        )
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            title,
            type: _get(type, "value", ""),
            recurrence,
            level: _get(level, "value", ""),
            dateTime,
            tags: [...tags.map((tag) => tag.value)],
          },
          postAdd,
          onConfirm
        )
      );
    }
  };

  React.useEffect(() => {
    const chapterId = id || qs.parse(location.search).chapterId;
    if (chapterId) {
      dispatch(operations.fetchLesson(chapterId));
    } else {
      dispatch(operations.initPage());
    }
    return () => dispatch(operations.initPage());
  }, []);

  const getSubmitButton = () => {
    if (isSubmitting)
      return (
        <>
          <Button type="default" size={isPopup ? "sm" : "md"} disabled={true}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            className="btn-icon"
            disabled={true}
            size={isPopup ? "sm" : "md"}
          >
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>
            <span className="btn-inner-text">
              {isEdit ? "Save/Edit Lesson" : "Add Lesson"}
            </span>
          </Button>
        </>
      );
    return (
      <>
        <Button
          type="default"
          size={isPopup ? "sm" : "md"}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          color="primary"
          size={isPopup ? "sm" : "md"}
          className="align-items-right"
          onClick={(e) => onSubmit(e)}
        >
          {isEdit ? "Save/Edit Lesson" : "Add Lesson"}
        </Button>
      </>
    );
  };

  return (
    <div
      className={cs("addLesson", {
        "mx-3 mx-md-4 ml-lg-7": !isPopup,
      })}
    >
      <Helmet>
        <title>AddLesson</title>
        <meta name="description" content="Description of AddLesson" />
      </Helmet>
      <Row className="my-3">
        <Col xs="12">
          <div className="text-primary text-left font-weight-bold">
            {isEdit ? "Edit a Lesson" : "Add a Lesson"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={3} className="text-sm">
            Title
          </Label>
          <Col>
            <RtInput
              onChange={(e) => dispatch(operations.changeTitle(e))}
              type="text"
              placeholder="Enter Lesson Title"
              error={validations}
              name="title"
              value={title}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="dateTime" sm={3} className="text-sm">
            Date & Time
          </Label>
          <Col>
            <ReactDatetime
              inputProps={{ placeholder: "Select Date & Time (Optional)" }}
              onChange={(e) => dispatch(operations.changeDate(e))}
              dateFormat="DD/MM/YYYY"
              timeFormat="hh:mm:ss A"
              value={dateTime}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lessonType" sm={3} className="text-sm">
            Type
          </Label>
          <Col>
            <RtReactSelect
              options={[
                { value: "instant", label: "Instant" },
                { value: "scheduled", label: "Scheduled" },
                { value: "recurring", label: "Recurring" },
                {
                  value: "recurringWithFixedTime",
                  label: "Recurring With Fixed Time",
                },
              ]}
              placeholder="Lesson Type"
              error={validations}
              value={type}
              name="type"
              onChange={(e) => dispatch(operations.changeType(e))}
            />
          </Col>
        </FormGroup>
        {type && type.value === "recurringWithFixedTime" && (
          <FormGroup row>
            <Label for="exampleSelect" sm={3} className="text-sm">
              Frequency
            </Label>
            <Col sm={6}>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  className="custom-control-input"
                  id="customRadioInline1"
                  name="customRadioInline1"
                  type="radio"
                  checked={recurrenceType === "daily"}
                  onChange={() =>
                    dispatch(operations.changeRecurrenceType("daily"))
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline1"
                >
                  Daily
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  className="custom-control-input"
                  id="customRadioInline2"
                  name="customRadioInline1"
                  type="radio"
                  checked={recurrenceType === "weekly"}
                  onChange={() =>
                    dispatch(operations.changeRecurrenceType("weekly"))
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  Weekly
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  className="custom-control-input"
                  id="customRadioInline3"
                  name="customRadioInline1"
                  type="radio"
                  checked={recurrenceType === "monthly"}
                  onChange={() =>
                    dispatch(operations.changeRecurrenceType("monthly"))
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline3"
                >
                  Monthly
                </label>
              </div>
            </Col>
          </FormGroup>
        )}
        <FormGroup row>
          <Label for="lessonLevel" sm={3} className="text-sm">
            Level
          </Label>
          <Col>
            <RtReactSelect
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
              ]}
              placeholder="Lesson Level"
              error={validations}
              value={level}
              name="level"
              onChange={(e) => dispatch(operations.changeLevel(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="tags" sm={3} className="text-sm">
            Tags
          </Label>
          <Col>
            <CreatableSelect
              options={[
                { value: "React", label: "React" },
                { value: "Angular", label: "Angular" },
                { value: "AWS", label: "AWS" },
                { value: "DataScience", label: "Data Science" },
                { value: "Mongo", label: "Mongo" },
              ]}
              placeholder="Tags"
              error={validations}
              value={tags}
              isMulti={true}
              name="tags"
              onChange={(e) => dispatch(operations.changeTag(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

AddLesson.propTypes = {};
