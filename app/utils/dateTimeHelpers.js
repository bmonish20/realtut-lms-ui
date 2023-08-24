import moment from "moment-timezone";

export const parseDateTime = (dateTime) => {
  const date = moment(dateTime);
  return {
    date: date.format("L"),
    time: date.format("LT"),
  };
};

export const parseDate = (dateTime, format = "L") => {
  const date = moment(dateTime);
  return date.format(format);
};

export const getDifference = (dateTime) => {
  if (moment().isAfter(dateTime)) return 0;
  return moment(dateTime).diff(moment(), "seconds");
};

export const getDurationToToday = (dateTime) => {
  const date = moment(dateTime);
  const durations = ["years", "months", "days", "hours"];
  for (var i = 0; i < durations.length; i++) {
    const duration = moment().diff(date, durations[i]);
    if (duration > 0) {
      return `about ${duration} ${durations[i]} ago`;
    }
  }
  return "a few minutes ago";
};

export const calculateTimeLeft = (taskDate, taskTime) => {
  const { date } = parseDateTime(taskDate);
  const { time } = parseDateTime(taskTime);
  const dateObj = moment(`${date} ${time}`).format("x");
  var diffTime = dateObj - Date.now();
  var duration = moment.duration(diffTime, "milliseconds");
  const { months, days, hours, minutes } = duration._data;
  if (months > 0) {
    return `${months}m ${days < 0 ? 0 : days}d ${hours < 0 ? 0 : hours}h ${
      minutes < 0 ? 0 : minutes
    }m`;
  } else
    return `${days < 0 ? 0 : days}d ${hours < 0 ? 0 : hours}h ${
      minutes < 0 ? 0 : minutes
    }m`;
};
