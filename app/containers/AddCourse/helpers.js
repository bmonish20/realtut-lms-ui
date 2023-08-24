
export const shapeToDropDown = (apiResponse = []) => {
  return apiResponse.map(({ id, title }) => ({
    value: id,
    label: title
  }));
}