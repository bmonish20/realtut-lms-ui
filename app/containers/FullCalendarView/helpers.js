export const shapeChaptersToClasses = (courses = []) => {
  var finalClasses = [];

  courses.map(({ courseProgress, courseId }) => {
    courseId.chapters.map((chapter) => {
      var individualClass = {};
      individualClass["courseId"] = courseId.id;
      individualClass["title"] = chapter.title;
      individualClass["dateTime"] = chapter.dateTime;
      individualClass["description"] = `Chapter of ${courseId.title} course`;
      individualClass["courseProgress"] = courseProgress;
      finalClasses.push(individualClass);
    });
  });

  return finalClasses;
};
