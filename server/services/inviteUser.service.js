const Request = require("../utils/request");

exports.create = async (req, res) => {
  try {
    const inviteUser = await Request(
      {
        url: "/v1/inviteUser",
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(inviteUser);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
