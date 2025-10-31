const formatDate = (day, month, year) => {
  return new Date(`${month} ${day}, ${year || new Date().getFullYear()}`);
};

export {formatDate}