import _get from "lodash/get";

export const isLoading = (state) => _get(state, "playChapter.isLoading", true);
export const title = (state) => _get(state, "playChapter.title", "");
export const hostedBy = (state) => _get(state, "playChapter.hostedBy", null);
export const hostedByPictureUrl = (state) =>
  _get(state, "playChapter.hostedByPictureUrl", null);
export const hostedById = (state) =>
  _get(state, "playChapter.hostedById", null);
export const shortDescription = (state) =>
  _get(state, "playChapter.shortDescription", null);
export const chapters = (state) => _get(state, "playChapter.chapters", [{}]);
export const resumeFrom = (state) => _get(state, "playChapter.resumeFrom", 0);

export const all = (state) => ({
  isLoading: isLoading(state),
  title: title(state),
  hostedBy: hostedBy(state),
  hostedByPictureUrl: hostedByPictureUrl(state),
  hostedById: hostedById(state),
  shortDescription: shortDescription(state),
  chapters: chapters(state),
  resumeFrom: resumeFrom(state),
});
