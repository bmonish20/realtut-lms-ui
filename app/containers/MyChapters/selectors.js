import _get from "lodash/get";

export const chapters = state => _get(state, "myChapters.chapters", []);
export const isLoading = state => _get(state, "myChapters.isLoading", true);
export const all = state => ({
  chapters: chapters(state),
  isLoading: isLoading(state)
})