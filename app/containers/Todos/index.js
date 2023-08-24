/**
 *
 * Todos
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Row, Col, Button } from "reactstrap";
import TaskCard, { TaskCardSkeleton } from "../../components/Cards/Task";
import AlertPopupHandler from "../../components/AlertPopup/AlertPopupHandler";
import { useInjectReducer } from "utils/injectReducer";
import history from "utils/history";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as operations from "./actions";
import "./todosStyle.scss";

export default function Todos() {
  useInjectReducer({ key: "todos", reducer });
  const dispatch = useDispatch();
  const { isLoading, todos } = useSelector((state) => ({
    isLoading: selectors.isLoading(state),
    todos: selectors.todos(state),
  }));

  React.useEffect(() => {
    dispatch(operations.fetchTodos());
  }, []);

  const onDelete = (id, todoName) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.deleteOneTodo(id)),
      confirmBtnText: "Delete",
      text: `You are about to delete "${todoName}". Do you want to continue?`,
      data: {},
      warning: true,
      customClass: "text-xs",
      btnSize: "sm",
    });
  };

  const onEdit = (id) => {
    history.push(`/add-todo?id=${id}`);
  };

  const getComponent = () => {
    if (isLoading)
      return (
        <>
          <Col xs="12" md="4">
            <TaskCardSkeleton />
          </Col>
          <Col xs="12" md="4">
            <TaskCardSkeleton />
          </Col>
        </>
      );
    return todos.map((todo, index) => (
      <React.Fragment key={index}>
        <Col xs="12" md="6" lg="4" key={index}>
          <TaskCard
            key={index}
            id={todo.id}
            todoName={todo.todoName}
            dueDate={todo.dueDate}
            time={todo.time}
            status={todo.status}
            priority={todo.priority}
            description={todo.description}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Col>
        {(index + 1) % 3 === 0 ? (
          <div key={`${todo.id}-${index}`} className="w-100" />
        ) : null}
      </React.Fragment>
    ));
  };

  return (
    <div className="todos mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Todos</title>
        <meta name="description" content="Todos Page" />
      </Helmet>
      <Row className="mt-3">
        <div className="align-items-right ml-auto mr-3 mr-md-5">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push("/add-todo")}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>
            <span className="btn-inner--text">Add Todo</span>
          </Button>
        </div>
      </Row>
      <Row className="mt-3">{getComponent()}</Row>
    </div>
  );
}

Todos.propTypes = {};
