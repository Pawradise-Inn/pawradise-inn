const getDateValidation = (entryDate, exitDate) => {
  let data = { status: true, warningText: "" };
  console.log(entryDate, entryDate.getDateValidation)
  if (entryDate.getTime() === exitDate.getTime()) {
    data.status = false;
    data.warningText = "Entry and exit date cannot be the same.";
  }
  if (entryDate.getTime() > exitDate.getTime()) {
    data.status = false;
    data.warningText = "Entry date must be earlier than exit date.";
  }
  return data;
};

export { getDateValidation };
