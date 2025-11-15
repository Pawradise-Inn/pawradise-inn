const getDateValidation = (entryDate, exitDate) => {
  let data = { status: true, warningText: "" };
  if (!entryDate && !exitDate) return null;
  if (!exitDate) {
    if (entryDate.getTime() < new Date()) {
      data.status = false;
      data.warningText = "Entry date must be later than today.";
    }
  } else {
    // Comment this line out if you want to test because test data is fixed date
    //  that might be behind today date.
    if (entryDate.getTime() < new Date() || exitDate.getTime() < new Date()) {
      data.status = false;
      data.warningText = "Entry date and Exit date must be later than today.";
    }
    // Comment this line out if you want to test because test data is fixed date
    //  that might be behind today date.
    else if (entryDate.getTime() === exitDate.getTime()) {
      data.status = false;
      data.warningText = "Entry and exit date cannot be the same.";
    } else if (entryDate.getTime() > exitDate.getTime()) {
      data.status = false;
      data.warningText = "Entry date must be earlier than exit date.";
    }
  }
  return data;
};

export { getDateValidation }