const Request = require("../utils/request");
const qs = require("query-string");

exports.list = async (req, res) => {
  try {
    const { quizResponsesId } = req.params;
    const reviews = await Request(
      {
        url: `v1/quizResponses/all?quizId=${quizResponsesId}&${qs.stringify(
          req.query
        )}`,
        method: "GET",
      },
      req.headers
    );
    res.json(reviews);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listAll = async (req, res) => {
  try {
    const reviews = await Request(
      {
        url: "v1/quizResponses/all",
        method: "GET",
      },
      req.headers
    );
    res.json(reviews);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetchScore = async (req, res) => {
  try {
    const { quizId, userId } = req.query;
    const response = await Request(
      {
        url: `v1/quizResponses/all?quizId=${quizId}&attendedBy=${userId}&perPage=1`,
        method: "GET",
      },
      req.headers
    );
    res.json(response);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const response = await Request(
      {
        url: "v1/quizResponses",
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(response);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { quizResponsesId } = req.params;
    const data = await Request(
      {
        url: `v1/quizResponses/${quizResponsesId}`,
        method: "DELETE",
        data: req.body,
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { quizResponsesId } = req.params;
    const review = await Request(
      {
        url: `v1/quizResponses/${quizResponsesId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(review);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { quizResponsesId } = req.params;
    const review = await Request(
      {
        url: `/v1/quizResponses/${quizResponsesId}`,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(review);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listUser = async (req, res) => {
  try {
    const {attendedBy} = req.query;
    const reviews = await Request(
      {
        url: `v1/quizResponses/all?attendedBy=${attendedBy}`,
        method: "GET",
      },
      req.headers
    );
    res.json(reviews);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};