/**
 *
 * Tasks
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Row,
  Col,
  Button,
  Table,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Select from "react-select";
import TaskCard, { TaskCardSkeleton } from "../../components/Cards/Task";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import _get from "lodash/get";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import { parseDateTime, calculateTimeLeft } from "utils/dateTimeHelpers";
import { getPriority, getStatus } from "utils/taskDetailsHelpers";
import isEmpty from "lodash/isEmpty";
import "./tasksStyle.scss";

export default function Tasks() {
  useInjectReducer({ key: "tasks", reducer });
  const dispatch = useDispatch();
  const changeFilter = operations.changeFilter(dispatch);
  const { isLoading, paginationDetails, tasks, selectedStatus } = useSelector(
    (state) => ({
      isLoading: selectors.isLoading(state),
      paginationDetails: selectors.paginationDetails(state),
      tasks: selectors.tasks(state),
      selectedStatus: selectors.selectedStatus(state),
    })
  );

  React.useEffect(() => {
    dispatch(
      operations.fetchFilteredTasks(_get(selectedStatus, "value", null), 1)
    );
  }, []);

  const onDelete = (id, taskName) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteOneTask(id)),
      confirmBtnText: "Delete",
      text: `You are about to delete "${taskName}". Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onView = (id) => {
    history.push(`/task-details?id=${id}`);
  };

  const onEdit = (id) => {
    history.push(`/add-task?id=${id}`);
  };

  const onViewHistory = (id) => {
    history.push(`/view-task-history?id=${id}`);
  };

  const onStatusSelect = (e) => {
    changeFilter(e);
    dispatch(operations.fetchFilteredTasks(_get(e, "value", null), 1));
  };

  const getDate = (dateTime) => {
    const { date } = parseDateTime(dateTime);
    return date;
  };

  const getTime = (dateTime) => {
    const { time } = parseDateTime(dateTime);
    return time;
  };

  const getTableData = () => {
    return tasks.map((task) => (
      <React.Fragment key={task.id}>
        <tr>
          <td
            className="hover-pointer"
            onClick={(e) => history.push(`/task-details?id=${task.id}`)}
          >
            <div className="title_text" title={task.taskName}>
              {task.taskName}
            </div>
          </td>
          <td>{task.category || "-"}</td>
          <td>{task.subCategory || "-"}</td>
          <td>{task.client || "-"}</td>
          <td>{task.startDate ? getDate(task.startDate) : "-"}</td>
          <td>{task.dueDate ? getDate(task.dueDate) : "-"}</td>
          <td>{task.time ? getTime(task.time) : "-"}</td>
          <td>{getPriority(task.priority)}</td>
          <td>{getStatus(task.status)}</td>
          <td>{calculateTimeLeft(task.dueDate, task.time)}</td>
          <td>
            {!isEmpty(task.fileUrl) ? `Yes (${task.fileUrl.length})` : "No"}
          </td>
          <td>
            <Button
              type="button"
              color="info"
              size="sm"
              onClick={(e) => onView(task.id)}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-eye" />
              </span>
            </Button>
            <Button
              type="button"
              color="primary"
              size="sm"
              onClick={(e) => onEdit(task.id)}
            >
              <span className="btn-inner--icon">
                <i className="far fa-edit" />
              </span>
            </Button>
            <Button
              type="button"
              color="success"
              size="sm"
              onClick={(e) => onViewHistory(task.id)}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-history" />
              </span>
            </Button>
            <Button
              type="button"
              color="danger"
              size="sm"
              onClick={(e) => onDelete(task.id)}
            >
              <span className="btn-inner--icon">
                <i className="far fa-trash-alt" />
              </span>
            </Button>
          </td>
        </tr>
      </React.Fragment>
    ));
  };

  const getPagination = () => {
    return (
      <Pagination aria-label="Page navigation example" size="sm">
        <PaginationItem>
          <PaginationLink
            first
            onClick={() =>
              dispatch(
                operations.fetchFilteredTasks(
                  _get(selectedStatus, "value", null),
                  1
                )
              )
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              dispatch(
                operations.fetchFilteredTasks(
                  _get(selectedStatus, "value", null),
                  paginationDetails.prevPage
                )
              )
            }
            previous
            {...(paginationDetails.hasPrevPage ? {} : { disabled: true })}
          />
        </PaginationItem>
        {paginationDetails.pageNumbers &&
          paginationDetails.pageNumbers.map((pageNumber) => (
            <PaginationItem active={paginationDetails.page === pageNumber}>
              <PaginationLink
                onClick={() =>
                  dispatch(
                    operations.fetchFilteredTasks(
                      _get(selectedStatus, "value", null),
                      pageNumber
                    )
                  )
                }
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              dispatch(
                operations.fetchFilteredTasks(
                  _get(selectedStatus, "value", null),
                  paginationDetails.nextPage
                )
              )
            }
            next
            {...(paginationDetails.hasNextPage ? {} : { disabled: true })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            onClick={() =>
              dispatch(
                operations.fetchFilteredTasks(
                  _get(selectedStatus, "value", null),
                  paginationDetails.totalPages
                )
              )
            }
          />
        </PaginationItem>
      </Pagination>
    );
  };
  return (
    <div className="tasks mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Tasks</title>
        <meta name="description" content="Tasks Page" />
      </Helmet>
      <Row className="mt-3 mb-4 align-items-center">
        <Label for="summary" sm="2" className="text-left">
          Filter by Status
        </Label>
        <Col sm={3}>
          <Select
            onChange={(e) => onStatusSelect(e)}
            isClearable={true}
            name="role"
            value={selectedStatus}
            options={[
              { value: "Open", label: "Open" },
              { value: "In Progress", label: "In Progress" },
              { value: "On-Hold", label: "On-Hold" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </Col>
        <Col className="text-right ml-auto">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push("/add-task")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Task</span>
          </Button>
        </Col>
      </Row>
      <Table className="align-items-center" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Category</th>
            <th scope="col">Sub Category</th>
            <th scope="col">Client</th>
            <th scope="col">Start Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Time</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">Time Left</th>
            <th scope="col">Attached Files?</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{getTableData()}</tbody>
      </Table>
      <Row className="mt-3 mb-4 align-items-center">
        <Col className="text-right ml-auto">{getPagination()}</Col>
      </Row>
    </div>
  );
}

Tasks.propTypes = {};
