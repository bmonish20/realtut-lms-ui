const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const activities = await Request(
      {
        url:
          "/v1/activityFeed/all?fields=id,activityType,description,createdAt",
        method: "GET",
      },
      req.headers
    );
    res.json(activities);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listTopFive = async (req, res) => {
  try {
    const activities = await Request(
      {
        url:
          "/v1/activityFeed/all?fields=id,activityType,description,createdAt&perPage=5",
        method: "GET",
      },
      req.headers
    );
    res.json(activities);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
