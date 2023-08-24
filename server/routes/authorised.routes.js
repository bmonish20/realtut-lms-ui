const express = require("express");
const taskService = require("../services/task.service");
const todoService = require("../services/todo.service");
const eventService = require("../services/events.service");
const courseService = require("../services/course.service");
const articleService = require("../services/article.service");
const chapterService = require("../services/chapter.service");
const questionService = require("../services/question.service");
const quizService = require("../services/quiz.service");
const quizResponsesService = require("../services/quizResponses.service");
const activityFeedService = require("../services/activityFeed.service");
const notificationService = require("../services/notification.service");
const pollService = require("../services/poll.service");
const forumService = require("../services/forum.service");
const inviteUserService = require("../services/inviteUser.service");
const courseReviewService = require("../services/courseReview.service.js");

const zoom = require("../services/zoom.service");

const router = express.Router();

router.get("/dashboard/events", eventService.fetchUpcomingEvents);
router.get(
  "/dashboard/notification",
  notificationService.fetchTopNotifications
);
router.get("/dashboard/activity", activityFeedService.listTopFive);
router.get("/dashboard/task", taskService.listTopSeven);

router.get("/event", eventService.list);
router.get("/event/date", eventService.listByDate);
router.get("/event/past", eventService.fetchPastEvents);
router.get("/event/:eventId", eventService.fetch);
router.delete("/event/:eventId", eventService.delete);
router.post("/event/:eventId/register", eventService.registerToEvent);
router.delete("/event/:eventId/register", eventService.removeRegistration);
router.patch("/event/:eventId", eventService.updateOne);
router.post("/event", eventService.create);

router.get("/courses", courseService.list);
router.get("/courses/all", courseService.listAll);
router.get("/courses/my", courseService.my);
router.get("/courses/trainer", courseService.trainerCourse);
router.get("/courses/trainer/past", courseService.trainerPastCourse);
router.get("/courses/past", courseService.listPastEvents);
router.post("/course", courseService.create);
router.get("/course/:courseId", courseService.fetch);
router.patch("/course/:courseId", courseService.updateOne);
router.delete("/course/:courseId", courseService.deleteOne);
router.post("/course/:courseId/register", courseService.registerToCourse);
router.delete("/course/:courseId/register", courseService.removeRegistration);
router.post("/course/:courseId/review", courseService.reviewCourse);
router.patch(
  "/course/:courseReviewId/review",
  courseService.updateCourseReview
);
router.post("/course/:courseId/progress", courseService.updateProgress);
router.get("/course/registrations/all", courseService.getCourseEnrollments);

router.get("/task", taskService.list);
router.delete("/task/:taskId", taskService.delete);
router.post("/task", taskService.create);
router.patch("/task/:taskId", taskService.updateOne);
router.get("/task/:taskId", taskService.fetch);

router.get("/todo", todoService.list);
router.delete("/todo/:todoId", todoService.delete);
router.post("/todo", todoService.create);
router.patch("/todo/:todoId", todoService.updateOne);
router.get("/todo/:todoId", todoService.fetch);

router.get("/article", articleService.list);
router.post("/article", articleService.create);
router.get("/article", articleService.listCategories);
router.get("/article/:articleId", articleService.fetch);
router.patch("/article/:articleId", articleService.updateOne);
router.delete("/article/:articleId", articleService.deleteOne);
router.post("/article/:articleId/like", articleService.like);
router.delete("/article/:articleId/like", articleService.unlike);

router.get("/question", questionService.list);
router.delete("/question/:questionId", questionService.delete);
router.post("/question", questionService.create);
router.patch("/question/:questionId", questionService.updateOne);
router.get("/question/:questionId", questionService.fetch);

router.post("/chapter", chapterService.create);
router.get("/chapter/all", chapterService.list);
router.get("/chapter/my", chapterService.my);
router.get("/chapter/:chapterId", chapterService.fetch);
router.patch("/chapter/:chapterId", chapterService.updateOne);
router.delete("/chapter/:chapterId", chapterService.deleteOne);

router.get("/quiz", quizService.list);
router.get("/quiz/my", quizService.my);
router.delete("/quiz/:quizId", quizService.delete);
router.post("/quiz", quizService.create);
router.patch("/quiz/:quizId", quizService.updateOne);
router.get("/quiz/:quizId", quizService.fetch);

router.get("/quizResponses/quiz/:quizResponsesId", quizResponsesService.list);
router.get("/quizResponses/all", quizResponsesService.listAll);
router.get("/quizResponses/score", quizResponsesService.fetchScore);
router.get("/quizResponses/:quizResponsesId", quizResponsesService.fetch);
router.get("/quizResponses", quizResponsesService.listUser);
router.patch("/quizResponses/:quizResponsesId", quizResponsesService.updateOne);
router.delete("/quizResponses/:quizResponsesId", quizResponsesService.delete);
router.post("/quizResponses", quizResponsesService.create);

router.get("/activityFeed", activityFeedService.list);
router.get("/zoom/token", zoom.token);

router.get("/notification", notificationService.list);
router.patch("/notification/:notificationId", notificationService.updateOne);

router.post("/poll", pollService.create);
router.get("/poll", pollService.fetch);
router.get("/poll/my", pollService.my);
router.patch("/poll/:pollId", pollService.updateOne);

router.post("/forum", forumService.create);
router.get("/forum/all", forumService.list);

router.post("/inviteUser", inviteUserService.create);

router.get("/reviews", courseReviewService.list);

module.exports = router;
