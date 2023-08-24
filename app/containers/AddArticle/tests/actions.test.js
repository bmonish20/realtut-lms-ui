import { defaultAction } from "../actions";
import { DEFAULT_ACTION } from "../constants";

describe("AddArticle actions", () => {
  describe("Default Action", () => {
    it("has a type of DEFAULT_ACTION", () => {
      const expected = {
        type: DEFAULT_ACTION
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
