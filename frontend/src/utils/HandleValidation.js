const getDateValidation = (entryDate, exitDate) => {
  let data = { status: true, warningText: "" };
  console.log(entryDate, entryDate.getDateValidation);
  if (entryDate.getTime() < new Date() || exitDate.getTime() < new Date()) {
    data.status = false;
    data.warningText = "Entry date and Exit date must be later than today.";
  } else if (entryDate.getTime() === exitDate.getTime()) {
    data.status = false;
    data.warningText = "Entry and exit date cannot be the same.";
  } else if (entryDate.getTime() > exitDate.getTime()) {
    data.status = false;
    data.warningText = "Entry date must be earlier than exit date.";
  }
  return data;
};

export { getDateValidation };
