const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const { page, status } = req.query;
    const tasks = await Request(
      {
        url: `/v1/task/all?status=${status}&page=${page}`,
        method: "GET",
      },
      req.headers
    );
    res.json(tasks);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listTopSeven = async (req, res) => {
  try {
    const tasks = await Request(
      {
        url: `/v1/task/all?perPage=7`,
        method: "GET",
      },
      req.headers
    );
    res.json(tasks);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const task = await Request(
      {
        url: `/v1/task`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(task);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Request(
      {
        url: `/v1/task/${taskId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(task);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { taskId } = req.params;
    const data = await Request(
      {
        url: `/v1/task/${taskId}`,
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
    const { taskId } = req.params;
    const data = await Request(
      {
        url: `/v1/task/${taskId}`,
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
