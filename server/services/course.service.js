const Request = require("../utils/request");

exports.list = async (req, res) => {
  try {
    const { date } = req.query;
    const courses = await Request(
      {
        url: `/v1/course/all?date=${date}&fields=id,title,type,pictureUrl,shortDescription`,
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listAll = async (req, res) => {
  try {
    const courses = await Request(
      {
        url: "/v1/course/all",
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.listPastEvents = async (req, res) => {
  try {
    const { endDate } = req.query;
    const courses = await Request(
      {
        url: `/v1/course/all?endDate=${endDate}&fields=id,title,type,pictureUrl,shortDescription`,
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.trainerCourse = async (req, res) => {
  try {
    const { date, userId } = req.query;
    const courses = await Request(
      {
        url: `/v1/course/all?date=${date}&hostedBy=${userId}&fields=id,title,type,pictureUrl,shortDescription`,
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.trainerPastCourse = async (req, res) => {
  try {
    const { date, userId } = req.query;
    const courses = await Request(
      {
        url: `/v1/course/all?endDate=${date}&hostedBy=${userId}&fields=id,title,type,pictureUrl,shortDescription`,
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.my = async (req, res) => {
  try {
    const { fields } = req.query;
    const courses = await Request(
      {
        url: `/v1/course/my?fields=${fields}`,
        method: "GET",
      },
      req.headers
    );
    res.json(courses);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.fetch = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}`,
        method: "GET",
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const course = await Request(
      {
        url: "/v1/course",
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}`,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}`,
        method: "DELETE",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.registerToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}/register`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.removeRegistration = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}/register`,
        method: "DELETE",
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.reviewCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}/review`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateCourseReview = async (req, res) => {
  try {
    const { courseReviewId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseReviewId}/review`,
        method: "PATCH",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Request(
      {
        url: `/v1/course/${courseId}/progress`,
        method: "POST",
        data: req.body,
      },
      req.headers
    );
    res.json(course);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

exports.getCourseEnrollments = async (req, res) => {
  try {
    const courseRegistrations = await Request(
      {
        url: "/v1/course/registrations/all",
        method: "GET",
      },
      req.headers
    );
    res.json(courseRegistrations);
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
