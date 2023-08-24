const Request = require("../utils/request");

exports.create = async (req, res) => {
  try {
    const poll = await Request(
      {
        url: "/v1/poll",
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(poll);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { pollId } = req.params;
    const data = await Request(
      {
        url: `/v1/poll/${pollId}`,
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

exports.fetch = async (req, res) => {
  try {
    const { courseId, perPage } = req.query;
    const poll = await Request(
      {
        url: `/v1/poll/all?courseId=${courseId}&perPage=${perPage}`,
        method: "GET",
      },
      req.headers
    );
    res.json(poll);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.my = async (req, res) => {
  try {
    const polls = await Request(
      {
        url: `/v1/poll/my`,
        method: "GET",
      },
      req.headers
    );
    res.json(polls);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
