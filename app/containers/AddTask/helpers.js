export const shapeAvailableUsers = (users = []) => {
  let finalArray = [];
  users.forEach((user) => {
    finalArray.push({ value: user.id, label: user.name || user.firstName || user.userName });
  });
  return finalArray;
};
