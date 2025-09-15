const getWarningTextForDateValidation = (entryDate, exitDate) => {
	let warningText = "";
	if (entryDate == exitDate) {
		warningText = "Sorry, you cannot booking at the same day";
	} else if (new Date(entryDate) > new Date(exitDate)) {
		warningText = "Invalid date booking";
	} else {
		warningText = "";
	}
	return warningText;
};

export { getWarningTextForDateValidation }