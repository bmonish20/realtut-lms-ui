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
  Button,
  Spinner,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ReactDatetime from "react-datetime";
import Select2 from "react-select2-wrapper";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";

function AddTodo({ location }) {
  useInjectReducer({ key: "addTodo", reducer });
  const dispatch = useDispatch();
  const changeTitle = operations.changeTitle(dispatch);
  const changePriority = operations.changePriority(dispatch);
  const changeDate = operations.changeDate(dispatch);
  const changeTime = operations.changeTime(dispatch);
  const changeStatus = operations.changeStatus(dispatch);
  const changeDescription = operations.changeDescription(dispatch);
  const addTodoInit = operations.addTodoInit(dispatch);

  const {
    todoName,
    priority,
    dueDate,
    time,
    status,
    description,
    isLoading,
    errorMessage,
    validations,
    isEdit,
  } = useSelector((state) => ({
    todoName: selectors.todoName(state),
    priority: selectors.priority(state),
    dueDate: selectors.dueDate(state),
    time: selectors.time(state),
    status: selectors.status(state),
    description: selectors.description(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
  }));

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => addTodoInit();
  }, []);

  let taskPriorityRef = React.useRef(null);
  let taskStatusRef = React.useRef(null);

  const onPrioritySelect = () => {
    if (taskPriorityRef.el != undefined) {
      changePriority(taskPriorityRef.el.val());
    }
  };

  const onStatusSelect = () => {
    if (taskStatusRef.el != undefined) {
      changeStatus(taskStatusRef.el.val());
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editTodo(id, {
          todoName,
          priority,
          dueDate,
          time,
          status,
          description,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          todoName,
          priority,
          dueDate,
          time,
          status,
          description,
        })
      );
    }
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
            {isEdit ? "Save/Edit Todo" : "Add Todo"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Todo" : "Add Todo"}
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

  return (
    <div className="addTodo mx-3 mx-md-4 ml-lg-7">
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Todo" : "Add a Todo"}
          </div>
        </Col>
      </Row>
      <Form role="form" onSubmit={(e) => onSubmit(e)}>
        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={6}>
            <RtInput
              onChange={changeTitle}
              type="text"
              placeholder="Enter Event Title"
              error={validations}
              name="todoName"
              value={todoName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Priority
          </Label>
          <Col sm={6}>
            <Select2
              className="form-control"
              ref={(e) => {
                taskPriorityRef = e;
              }}
              data={[
                { id: "1", text: "High" },
                { id: "2", text: "Medium" },
                { id: "3", text: "Low" },
              ]}
              options={{
                placeholder: "select",
              }}
              value={priority}
              onChange={(e) => onPrioritySelect()}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Due Date</Label>
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
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                onChange={(e) => changeDate(e)}
                value={dueDate}
              />
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Status
          </Label>
          <Col sm={6}>
            <Select2
              className="form-control"
              ref={(e) => {
                taskStatusRef = e;
              }}
              data={[
                { id: "Open", text: "Open" },
                { id: "In Progress", text: "In Progress" },
                { id: "On-Hold", text: "On-Hold" },
                { id: "Completed", text: "Completed" },
              ]}
              options={{
                placeholder: "select",
              }}
              value={status}
              onChange={(e) => onStatusSelect(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Time</Label>
          <Col sm={6}>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-watch-time" />
                </InputGroupText>
              </InputGroupAddon>
              <ReactDatetime
                inputProps={{
                  placeholder: "Select Time",
                }}
                dateFormat={false}
                timeFormat="hh:mm:ss A"
                onChange={(e) => changeTime(e)}
                value={time}
              />
            </InputGroup>
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
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default AddTodo;
