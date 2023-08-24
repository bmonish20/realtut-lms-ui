const Request = require("../utils/request");

exports.fetchUpcomingEvents = async (req, res) => {
  try {
    const { startDate, perPage, fields } = req.query;
    const url = `/v1/event/all?date=${startDate}&perPage=${perPage}&fields=${fields}`;
    const events = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(events);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetchPastEvents = async (req, res) => {
  try {
    const { endDate, perPage, fields } = req.query;
    const url = `/v1/event/all?endDate=${endDate}&perPage=${perPage}&fields=${fields}`;
    const events = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(events);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    const webinars = await Request(
      {
        url: `/v1/event/all?fields=id,title,type,dateTime,shortDescription,hostedBy,hostedByPictureUrl`,
        method: "GET",
      },
      req.headers
    );
    res.json(webinars);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const webinars = await Request(
      {
        url: `/v1/event/date?sidebarStartDate=${startDate}&sidebarEndDate=${endDate}&fields=id,title,type,dateTime,shortDescription,hostedBy,hostedByPictureUrl`,
        method: "GET",
      },
      req.headers
    );
    res.json(webinars);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const event = await Request(
      {
        url: `/v1/event`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(event);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Request(
      {
        url: `/v1/event/${eventId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(event);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await Request(
      {
        url: `/v1/event/${eventId}`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.registerToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await Request(
      {
        url: `/v1/event/${eventId}/register`,
        method: "POST",
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
    const { eventId } = req.params;
    const data = await Request(
      {
        url: `/v1/event/${eventId}`,
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

exports.removeRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const data = await Request(
      {
        url: `/v1/event/${eventId}/register`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
