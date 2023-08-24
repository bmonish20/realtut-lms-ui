import _map from "lodash/map";
import _isObject from "lodash/isObject";
import _get from "lodash/get";
import useGetFieldFromObjects from "./useGetFieldFromObject";

export const permissions = {
  BOOK_AN_EVENT: "book an event",
  ADD_EVENT: "add an event",
  EDIT_MY_EVENT: "edit my event",
  EDIT_ALL_EVENT: "edit all events",
  DELETE_MY_EVENT: "delete my event",
  DELETE_ALL_EVENT: "delete all event",

  BOOK_A_COURSE: "book a course",
  ADD_COURSE: "add a course",
  EDIT_MY_COURSE: "edit my course",
  EDIT_ALL_COURSE: "edit all course",
  DELETE_MY_COURSE: "delete my course",
  DELETE_ALL_COURSE: "delete all course",

  ADD_AN_ARTICLE: "add an article",
  EDIT_MY_ARTICLE: "edit my article",
  EDIT_ALL_ARTICLE: "edit all article",
  DELETE_MY_ARTICLE: "delete my article",
  DELETE_ALL_ARTICLE: "delete all article",

  VIEW_USERS: "view all users",
  VIEW_REPORTS: "view all reports",

  VIEW_MY_LESSONS: "view my lessons",

  ADD_A_QUIZ: "add a quiz",
  ATTEND_A_QUIZ: "attend a quiz",
  REVIEW_MY_QUIZ: "review my quiz",
  REVIEW_ALL_QUIZ: "review all quiz",
  DELETE_MY_QUIZ: "delete my quiz",
  DELETE_ALL_QUIZ: "delete all quiz",
};

export const useAccess = (permissions, eitherOr = true) => {
  const userPermissions =
    useGetFieldFromObjects("authPage", "permissions", []) || [];
  const isPermissionAllowed = (permission) =>
    userPermissions.includes(permission);

  const finalPermissions = [].concat(permissions);
  const allPermissions = _map(finalPermissions, (perm) => {
    const isAllowed = isPermissionAllowed(
      _isObject(perm) ? _get(perm, "permission") : perm
    );
    const operation = _get(perm, "operation", "and");
    const otherBoolean = _get(perm, "value", true);
    switch (operation) {
      case "and":
        return isAllowed && otherBoolean;
      default:
        return isAllowed || otherBoolean;
    }
  });

  if (eitherOr) {
    return allPermissions.some((perm) => !!perm);
  }
  return allPermissions.every((perm) => !!perm);
};
