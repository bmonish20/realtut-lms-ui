const Request = require("../utils/request");
const qs = require("query-string");

exports.list = async (req, res) => {
  try {
    const articles = await Request(
      {
        url: `/v1/article/all?${qs.stringify(req.query)}`,
        method: "GET",
      },
      req.headers
    );
    res.json(articles);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Request(
      {
        url: `/v1/article/category`,
        method: "GET",
      },
      req.headers
    );
    res.json(categories);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const article = await Request(
      {
        url: `/v1/article`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(article);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Request(
      {
        url: `/v1/article/${articleId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(article);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { articleId } = req.params;
    const article = await Request({
      url: `/v1/article/${articleId}`,
      method: 'PATCH',
      data: req.body
    }, req.headers);
    res.json(article);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const { articleId } = req.params;
    const data = await Request(
      {
        url: `/v1/article/${articleId}`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(data);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.like = async (req, res) => {
  try {
    const { articleId } = req.params;
    const data = await Request(
      {
        url: `/v1/article/${articleId}/like`,
        method: "POST",
      },
      req.headers
    );
    res.json(data);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}

exports.unlike = async (req, res) => {
  try {
    const { articleId } = req.params;
    const data = await Request(
      {
        url: `/v1/article/${articleId}/like`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(data);
  }
  catch (err) {
    res.status(err.status).json(err.message);
  }
}
