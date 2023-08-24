export const shapeToDropDown = (apiResponse = []) => {
  return apiResponse.map(({ id, question }) => ({
    value: id,
    label: question.replace(/(<([^>]+)>)/gi, ""),
  }));
};
