import moment from "moment-timezone";
import _ from "lodash";
import { getUserQuizResponses, getQuizScore } from "./reportsApi";

export const mapMonthlyReport = (monthlyStudentData = []) => {
  var modifiedData = {};
  var finalTableData = [];

  // Group by Month
  monthlyStudentData.map((item) => {
    var key = moment(item["startDate"]).format("MMMM-YYYY");
    if (modifiedData[key] === undefined) {
      modifiedData[key] = [];
    }
    modifiedData[key].push(item);
  });

  // Form array with month, enrollments and courses created
  for (const key in modifiedData) {
    var trainees = 0;
    var courses = modifiedData[key].length;
    modifiedData[key].map((data) => {
      trainees += data.registeredUsers;
    });
    finalTableData.push({ month: key, trainees, courses });
  }

  // Calculate percentage difference in enrollments
  for (var i = 0; i < finalTableData.length; i++) {
    if (i == 0) {
      finalTableData[i]["percentage"] = 0;
    } else {
      var difference =
        finalTableData[i]["trainees"] - finalTableData[i - 1]["trainees"];

      var actualPercentage = Math.round(
        (difference / finalTableData[i - 1]["trainees"]) * 100
      );
      finalTableData[i]["percentage"] = actualPercentage ? actualPercentage : 0;
    }
  }
  finalTableData.reverse();

  return finalTableData;
};

export const mapStudentAssessment = (studentAssessmentData = []) => {
  var finalData = [];
  var groupedData = _.groupBy(studentAssessmentData, "attendedBy._id");

  for (const key in groupedData) {
    var total = 0;
    var user = 0;
    var userName = "";
    var attempted = groupedData[key].length;
    groupedData[key].map(({ totalScore, userScore, attendedBy }) => {
      total += totalScore ? totalScore : 0;
      user += userScore ? userScore : 0;
      userName = attendedBy.name;
    });

    finalData.push({
      userName,
      totalScore: total,
      userScore: user,
      attempted,
    });
  }

  return finalData;
};

export const mapCourseWise = async (courseWiseData = []) => {
  var finalData = [];

  // Looping through each course record
  for (var i = 0; i < courseWiseData.length; i++) {
    var record = {};
    record["name"] = courseWiseData[i].userId.name;
    record["email"] = courseWiseData[i].userId.email;

    record["questionsCount"] = 0;
    record["totalMarks"] = 0;
    record["userMarks"] = 0;

    // see if quizzes are present
    if (
      Array.isArray(courseWiseData[i].courseId.quizzes) &&
      courseWiseData[i].courseId.quizzes.length
    ) {
      // if quizzes are present loop through and find the response of the user
      for (var j = 0; j < courseWiseData[i].courseId.quizzes.length; j++) {
        record["questionsCount"] +=
          courseWiseData[i].courseId.quizzes[j].questions.length;
        const { data: quizScore } = await getQuizScore(
          courseWiseData[i].courseId.quizzes[j].id,
          courseWiseData[i].userId._id
        );

        // if user had responded calculate total marks and usermarks
        if (Array.isArray(quizScore) && quizScore.length) {
          record["totalMarks"] += quizScore[0].totalScore;
          record["userMarks"] += quizScore[0].userScore;
        }
      }
    }

    // Calculate other neccessary data
    record["passingMarks"] = Math.round(record["totalMarks"] * 0.6);
    record["percentage"] = Math.round(
      (record["userMarks"] / record["totalMarks"]) * 100
    );
    record["result"] = record["percentage"] >= 60 ? "Pass" : "Failed";
    finalData.push(record);
  }

  return finalData;
};

export const mapStudentLeaderBoard = async (leaderboardData = []) => {
  var studentDetails = [];
  var studentDetail;
  for (var i = 0; i < leaderboardData.length; i++) {
    studentDetail = studentDetails.find(
      (element) => element.id == leaderboardData[i].userId["_id"]
    );
    if (!studentDetail) {
      const { data: quizResponses } = await getUserQuizResponses(
        leaderboardData[i].userId["_id"]
      );
      if (quizResponses.length) {
        let record = {
          id: leaderboardData[i].userId["_id"],
          name: leaderboardData[i].userId["name"],
          totalScore: 0,
          userScore: 0,
          courseCompleted: 0,
          courseTotal: 1,
          result: 0,
        };
        for (var j = 0; j < quizResponses.length; j++) {
          record["userScore"] += quizResponses[j].userScore
            ? quizResponses[j].userScore
            : 0;
          record["totalScore"] += quizResponses[j].totalScore
            ? quizResponses[j].totalScore
            : 0;
          if (
            leaderboardData[i].courseProgress ==
            leaderboardData[i].courseId.chapters.length
          )
            record["courseCompleted"] = 1;
        }
        if (record["userScore"] != 0 && record["totalScore"] != 0)
          record["result"] += Math.round(
            (record["userScore"] / record["totalScore"]) * 100
          );
        else record["result"] = 0;
        studentDetails.push(record);
      }
    } else {
      studentDetail.courseTotal = studentDetail.courseTotal + 1;
      if (
        leaderboardData[i].courseProgress ==
        leaderboardData[i].courseId.chapters.length
      )
        studentDetail["courseCompleted"] = studentDetail["courseCompleted"] + 1;
    }
  }
  const shapedLeaderboardData = _.orderBy(studentDetails, "result", "desc");
  return shapedLeaderboardData;
};
