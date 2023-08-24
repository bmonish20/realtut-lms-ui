const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const questions = await Request(
      {
        url: `/v1/question/all?fields=id,question,type,points,createdBy`,
        method: "GET",
      },
      req.headers
    );
    res.json(questions);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const question = await Request(
      {
        url: `/v1/question`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(question);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Request(
      {
        url: `/v1/question/${questionId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(question);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { questionId } = req.params;
    const data = await Request(
      {
        url: `/v1/question/${questionId}`,
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
    const { questionId } = req.params;
    const data = await Request(
      {
        url: `/v1/question/${questionId}`,
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
