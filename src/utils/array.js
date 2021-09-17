export const getArrayFirstItem = (array) => {
  if (!Array.isArray(array)) {
    return null;
  }

  return array[0];
};

export const getArrayLastItem = (array) => {
  if (!Array.isArray(array)) {
    return null;
  }

  return array[array.length - 1];
};
