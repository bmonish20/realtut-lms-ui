const Request = require("../utils/request");
const qs = require("query-string");

exports.create = async (req, res) => {
  try {
    const lesson = await Request({
      url: '/v1/chapter',
      method: 'POST',
      data: req.body,
    }, req.headers);
    res.json(lesson);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}

exports.list = async (req, res) => {
  try {
    const { perPage, fields } = req.query;
    const url = `/v1/chapter/all?perPage=${perPage}&fields=${fields}`;
    const chapters = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(chapters);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.my = async (req, res) => {
  try {
    const url = `/v1/chapter/my?${qs.stringify(req.query)}`;
    const chapters = await Request(
      {
        url,
        method: "GET",
      },
      req.headers
    );
    res.json(chapters);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Request({
      url: `/v1/chapter/${chapterId}`,
      method: 'GET'
    }, req.headers);
    res.json(chapter);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}

exports.updateOne = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Request({
      url: `/v1/chapter/${chapterId}`,
      method: 'PATCH',
      data: req.body
    }, req.headers);
    res.json(chapter);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Request({
      url: `/v1/chapter/${chapterId}`,
      method: 'DELETE',
    }, req.headers);
    res.json(chapter);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}