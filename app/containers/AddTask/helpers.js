export const shapeAvailableUsers = (users = []) => {
  let finalArray = [];
  users.forEach((user) => {
    finalArray.push({ value: user.id, label: user.name });
  });
  return finalArray;
};
