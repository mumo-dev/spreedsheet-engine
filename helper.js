const isDate = (date) => {
  const parsedDate = Date.parse(date);
  // You want to check again for !isNaN(parsedDate) here because Dates can be converted
  // to numbers, but a failed Date parse will not.
  return isNaN(date) && !isNaN(parsedDate);
};

module.exports =  { isDate }