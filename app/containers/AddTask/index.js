import React, { useCallback, useState } from "react";
import qs from "query-string";
import { useDropzone } from "react-dropzone";
import { accept } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useInjectReducer } from "utils/injectReducer";
import isEmpty from "lodash/isEmpty";
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
import moment from "moment-timezone";
import ReactDatetime from "react-datetime";
import Select2 from "react-select2-wrapper";
import ReactSelect from "react-select";
import TextEditor from "components/TextEditor";
import CreatableSelect from "react-select/creatable";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import RtInput from "../../components/RtInput/index";

function AddTask({ location }) {
  useInjectReducer({ key: "addTaskPage", reducer });
  const dispatch = useDispatch();
  const changeTitle = operations.changeTitle(dispatch);
  const changeCategory = operations.changeCategory(dispatch);
  const changeSubCategory = operations.changeSubCategory(dispatch);
  const changeClient = operations.changeClient(dispatch);
  const changePriority = operations.changePriority(dispatch);
  const changeStartDate = operations.changeStartDate(dispatch);
  const changeDate = operations.changeDate(dispatch);
  const changeTime = operations.changeTime(dispatch);
  const changeStatus = operations.changeStatus(dispatch);
  const changeAssignedTo = operations.changeAssignedTo(dispatch);
  const changeDescription = operations.changeDescription(dispatch);
  const addTaskInit = operations.addTaskInit(dispatch);
  const [cookie] = useCookies(["user"]);

  const [resumeUrl, changeResumeUrl] = useState("");

  const openDocument = (e) => {
    if (isEmpty(resumeUrl)) {
      e.preventDefault();
      return;
    }
    window.open(resumeUrl, "_blank");
  };

  const {
    taskName,
    category,
    subCategory,
    client,
    priority,
    startDate,
    dueDate,
    time,
    status,
    description,
    assignedTo,
    logs,
    fileUrl,
    signedFileUrls,
    isLoading,
    errorMessage,
    validations,
    isEdit,
    availableUsers,
  } = useSelector((state) => ({
    taskName: selectors.taskName(state),
    category: selectors.category(state),
    subCategory: selectors.subCategory(state),
    client: selectors.client(state),
    priority: selectors.priority(state),
    startDate: selectors.startDate(state),
    dueDate: selectors.dueDate(state),
    time: selectors.time(state),
    status: selectors.status(state),
    description: selectors.description(state),
    assignedTo: selectors.assignedTo(state),
    logs: selectors.logs(state),
    fileUrl: selectors.fileUrl(state),
    signedFileUrls: selectors.signedFileUrls(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    isEdit: selectors.isEdit(state),
    availableUsers: selectors.availableUsers(state),
  }));

  const onDrop = useCallback((acceptedFiles) => {}, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop, accept });

  let acceptedFileItems =
    acceptedFiles != undefined
      ? acceptedFiles.map((file, i) => <a key={file.path}>{file.path} </a>)
      : [];

  React.useEffect(() => {
    const id = qs.parse(location.search).id;
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    dispatch(operations.fetchUsers());
    return () => addTaskInit();
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

  const yesterday = moment().subtract(1, "day");
  const disablePastDates = (date) => {
    return date.isAfter(yesterday);
  };

  const preventDueBeforeStart = (date) => {
    return date.isAfter(startDate);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const id = qs.parse(location.search).id;
      dispatch(
        operations.editTask(id, {
          taskName,
          category: category.value.toLowerCase(),
          subCategory: subCategory.value.toLowerCase(),
          client: client.value.toLowerCase(),
          priority,
          startDate,
          dueDate,
          time,
          status,
          description,
          assignedTo,
          fileUrl,
          logs: [
            {
              text: `${cookie.user.name} edited the task ${taskName}`,
              dateTime: Date.now(),
            },
            ...logs,
          ],
          files: acceptedFiles,
        })
      );
    } else {
      dispatch(
        operations.onSubmit({
          taskName,
          category: category.value.toLowerCase(),
          subCategory: subCategory.value.toLowerCase(),
          client: client.value.toLowerCase(),
          priority,
          startDate,
          dueDate,
          time,
          status,
          description,
          assignedTo,
          logs: [
            {
              text: `${cookie.user.name} created the task ${taskName}`,
              dateTime: Date.now(),
            },
            ...logs,
          ],
          files: acceptedFiles,
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
            {isEdit ? "Save/Edit Task" : "Add Task"}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={(e) => onSubmit(e)}>
        {isEdit ? "Save/Edit Task" : "Add Task"}
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
    <div className="addTask mx-3 mx-md-4 ml-lg-7">
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <div className="text-primary font-weight-bold">
            {isEdit ? "Edit Task" : "Add a Task"}
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
              name="taskName"
              value={taskName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Category
          </Label>
          <Col sm={6}>
            <CreatableSelect
              options={[
                { value: "React", label: "React" },
                { value: "Angular", label: "Angular" },
                { value: "AWS", label: "AWS" },
                { value: "Data Science", label: "Data Science" },
                { value: "Mongo", label: "Mongo" },
              ]}
              value={category}
              onChange={(e) => changeCategory(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Sub Category
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
              value={subCategory}
              onChange={(e) => changeSubCategory(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Client
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
              value={client}
              onChange={(e) => changeClient(e)}
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
          <Label sm={2}>Start Date</Label>
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
                isValidDate={disablePastDates}
                onChange={(e) => changeStartDate(e)}
                value={startDate}
              />
            </InputGroup>
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
                {...(startDate
                  ? { isValidDate: preventDueBeforeStart }
                  : { isValidDate: disablePastDates })}
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
          <Label for="exampleSelect" sm={2}>
            Assign To
          </Label>
          <Col sm={6}>
            <ReactSelect
              className="basic-multi-select"
              isMulti
              options={availableUsers}
              classNamePrefix="select"
              placeholder="select users"
              value={assignedTo}
              onChange={(e) => changeAssignedTo(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={6}>
            <TextEditor
              onChange={changeDescription}
              theme="snow"
              placeholder="Enter the description"
              error={validations}
              name="description"
              value={description}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            Upload File(s)
          </Label>
          <Col sm={6}>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="dz-drag-hover dz-preview-img  dz-message dropzone"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop your files here, or click to select files.</p>
              )}
            </div>
          </Col>
          <Col>
            {!isEmpty(signedFileUrls)
              ? signedFileUrls.map(({ key, url }, index) => (
                  <Row className="mt-1">
                    Existing File {index + 1}
                    <Button
                      type="button"
                      color="info"
                      className="ml-1"
                      size="sm"
                      onClick={(e) => window.open(url, "_blank")}
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-paperclip" />
                      </span>{" "}
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      size="sm"
                      onClick={(e) =>
                        dispatch(operations.deleteAndRemoveFile(key, fileUrl))
                      }
                    >
                      <span className="btn-inner--icon">
                        <i className="fas fa-trash-alt" />
                      </span>{" "}
                    </Button>
                  </Row>
                ))
              : ""}
          </Col>
        </FormGroup>
        <FormGroup row>
          <div>
            {!isEmpty(resumeUrl) && (
              <div>(click on the file name to view/download the document)</div>
            )}
            {acceptedFiles.length > 0 && (
              <>Uploaded File - {acceptedFileItems}</>
            )}
          </div>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default AddTask;
