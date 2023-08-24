import React from "react";

export const shapeWithType = (chapters = [], quizzes = []) => {
  var chaptersModified = [];

  chapters.map((chapter) => {
    chapter["chapterType"] = "chapter";
    chaptersModified.push(chapter);
  });

  quizzes.map((quiz) => {
    quiz["chapterType"] = "quiz";
    chaptersModified.push(quiz);
  });

  return chaptersModified;
};

export const findCourseRating = (reviews = []) => {
  var courseRating = 0;
  var total = 0;

  reviews.map((review) => {
    total += review.rating;
  });

  courseRating = total / reviews.length;

  return courseRating || 0;
};
