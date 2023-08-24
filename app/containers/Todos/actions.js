/*
 *
 * Todos actions
 *
 */

import _get from "lodash/get";
import { UPDATE_TODO_LIST, TODO_PAGE_SET_LOADING } from "./constants";
import { getTodos, deleteTodo } from "./todosApi";
import NotificationHandler from "../../components/Notifications/NotificationHandler";

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const { data } = await getTodos();
      dispatch(updateTodoList(data));
    } catch (err) {
      dispatch(updateTodoList());
    }
  };
};

export const deleteOneTodo = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteTodo(id);
      NotificationHandler.open({
        operation: "success",
        title: "Todo deleted successfully",
      });
      dispatch(fetchTodos());
    } catch (err) {
      NotificationHandler.open({
        operation: "failure",
        message:
          _get(err, "response.data", null) ||
          "Something went wrong. Please try again later",
        title: "Unable to delete the Todo",
      });
      dispatch(setLoading(false));
    }
  };
};

const setLoading = (payload) => ({
  type: TODO_PAGE_SET_LOADING,
  payload,
});

const updateTodoList = (payload = []) => ({
  type: UPDATE_TODO_LIST,
  payload,
});
