const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const todos = await Request(
      {
        url: `/v1/todo/all?fields=id,todoName,dueDate,time,status,priority,description`,
        method: "GET",
      },
      req.headers
    );
    res.json(todos);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const todo = await Request(
      {
        url: `/v1/todo`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(todo);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Request(
      {
        url: `/v1/todo/${todoId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(todo);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await Request(
      {
        url: `/v1/todo/${todoId}`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await Request(
      {
        url: `/v1/todo/${todoId}`,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
