const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const reviews = await Request(
      {
        url: "/v1/course/reviews/all",
        method: "GET",
      },
      req.headers
    );
    res.json(reviews);
  } catch (err) {
    res.status(err.status).json(err.messages);
  }
};
