import * as operations from "./actions";
import {
  ALL_PUBLICATION,
  MY_PUBLICATION,
  MY_DRATS
} from "./constants";

export const dropdownOptions = (dispatch, cookie, category) => [
  {
    text: ALL_PUBLICATION,
    onClick: () => dispatch(operations.fetchArticles(ALL_PUBLICATION, category, cookie))
  },
  {
    text: MY_PUBLICATION,
    onClick: () => dispatch(operations.fetchArticles(MY_PUBLICATION, category, cookie))
  },
  {
    text: MY_DRATS,
    onClick: () => dispatch(operations.fetchArticles(MY_DRATS, category, cookie))
  }
];
  
export const categoryDropDown = (dispatch, cookie, articleType, categories = []) => {
  const items = [];
  categories.map((category) => items.push({
    text: category,
    onClick: () => dispatch(operations.fetchArticles(articleType, category, cookie))
  }));
  return items;
}