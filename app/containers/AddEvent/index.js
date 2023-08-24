import React from "react";
import qs from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useInjectReducer } from "utils/injectReducer";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import moment from "moment-timezone";
import ReactDatetime from "react-datetime";
import Select2 from "react-select2-wrapper";
import CreatableSelect from "react-select/creatable";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";

function AddEvent({ location }) {
  useInjectReducer({ key: "addEventPage", reducer });
  const dispatch = useDispatch();
  const changeTitle = operations.changeTitle(dispatch);
  const changeDate = operations.changeDate(dispatch);
  const changeParticipants = operations.changeParticipants(dispatch);
  const changeSummary = operations.changeSummary(dispatch);
  const changeDescription = operations.changeDescription(dispatch);
  const changeTags = operations.changeTags(dispatch);
  const changeEventLink = operations.changeEventLink(dispatch);
  const changeEventType = operations.changeEventType(dispatch);
  const addEventInit = operations.addEventInit(dispatch);

  const {
    title,
    dateTime,
    participants,
    shortDescription,
    description,
    tags,
    webinarLink,
    type,
    isLoading,
    errorMessage,
    validations,
    isEdit,
    recurrence,
    recurrenceType,
  } = useSelector((state) => ({
    title: selectors.title(state),
    dateTime: selectors.dateTime(state),
    participants: selectors.participants(state),
    shortDescription: selectors.shortDescription(state),
    description: selectors.description(state),
    tags: selectors.tags(state),
    webinarLink: selectors.webinarLink(state),
    type: selectors.type(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
    recurrence: selectors.recurrence(state),
    recurrenceType: selectors.recurrenceType(state),
  }));

  let eventTypeRef = React.useRef(null);

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => addEventInit();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editEvent(id, {
          title,
          dateTime,
          participants,
          shortDescription,
          description,
          tags,
          webinarLink,
          type,
          recurrence,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          title,
          dateTime,
          participants,
          shortDescription,
          description,
          tags,
          // webinarLink,
          type,
          recurrence,
        })
      );
    }
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDates = (current) => {
    return current.isAfter(yesterday);
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
          <span className="btn-inner-text">
            {isEdit ? "Save/Edit Event" : "Add Event"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Event" : "Add Event"}
      </Button>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  const onValueSelect = () => {
    if (eventTypeRef.el != undefined) {
      changeEventType(eventTypeRef.el.val());
    }
  };

  return (
    <div className="addEvent mx-3 mx-md-4 ml-lg-7">
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Event" : "Add an Event"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Event Title</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeTitle}
              type="text"
              placeholder="Enter Event Title"
              error={validations}
              name="title"
              value={title}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            Date & Time
          </Label>
          <Col sm={6}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Date",
                }}
                isValidDate={disablePastDates}
                dateFormat="DD/MM/YYYY"
                timeFormat="hh:mm:ss A"
                onChange={(e) => changeDate(e)}
                value={dateTime}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Participants
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={changeParticipants}
              type="text"
              placeholder="Enter the no. of Participants"
              error={validations}
              name="participants"
              value={participants}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Summary
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={changeSummary}
              type="textarea"
              placeholder="Enter a short summary"
              error={validations}
              name="shortDescription"
              value={shortDescription}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={6}>
            <RtInput
              onChange={changeDescription}
              type="textarea"
              placeholder="Enter the description"
              error={validations}
              name="description"
              value={description}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
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
              onChange={(e) => changeTags(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Event Type
          </Label>
          <Col sm={6}>
            <Select2
              className="form-control"
              ref={(e) => {
                eventTypeRef = e;
              }}
              data={[
                { id: "instant", text: "Instant" },
                { id: "scheduled", text: "Scheduled" },
                { id: "recurring", text: "Recurring" },
                {
                  id: "recurringWithFixedTime",
                  text: "Recurring With Fixed Time",
                },
              ]}
              options={{
                placeholder: "select",
              }}
              value={type}
              onChange={(e) => onValueSelect(e)}
            />
          </Col>
        </FormGroup>
        {type === "recurringWithFixedTime" && (
          <FormGroup row>
            <Label for="exampleSelect" sm={2} />
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
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default AddEvent;
