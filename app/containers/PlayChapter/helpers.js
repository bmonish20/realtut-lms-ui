import React from "react";

export const getSteps = (chapters = [], callback) => {
  const steps = chapters.map((chapter, index) => ({
    id: chapter.id,
    label: (
      <div className="text-xs">
        Chapter {index + 1}: {chapter.title}
      </div>
    ),
    onClick: () => callback(index),
  }));
  return steps;
};

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
