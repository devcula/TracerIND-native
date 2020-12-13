const isNotNullAndBlank = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  isNotNullAndBlank,
};
