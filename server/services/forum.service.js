const Request = require("../utils/request");

exports.create = async (req, res) => {
  try {
    const message = await Request(
      {
        url: "/v1/forum",
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(message);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    const { courseId, page } = req.query;
    const forumMessages = await Request(
      {
        url: `/v1/forum/all?courseId=${courseId}&perPage=15&page=${page}`,
        method: "GET",
      },
      req.headers
    );
    res.json(forumMessages);
  } catch (err) {
    res.status(err.status).json(err.messages);
  }
};
