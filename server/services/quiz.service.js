const Request = require("../utils/request");
const qs = require("query-string");

exports.list = async (req, res) => {
  try {
    const quizzes = await Request(
      {
        url: `/v1/quiz/all?fields=id,title,forCourse,duration`,
        method: "GET",
      },
      req.headers
    );
    res.json(quizzes);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.my = async (req, res) => {
  try {
    const url = `v1/quiz/my?${qs.stringify(req.query)}`;
    const quizzes = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(quizzes);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const quiz = await Request(
      {
        url: `/v1/quiz`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(quiz);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Request(
      {
        url: `/v1/quiz/${quizId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(quiz);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { quizId } = req.params;
    const data = await Request(
      {
        url: `/v1/quiz/${quizId}`,
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
    const { quizId } = req.params;
    const data = await Request(
      {
        url: `/v1/quiz/${quizId}`,
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
