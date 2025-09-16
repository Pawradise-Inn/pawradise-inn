const getDateValidation = (entryDate, exitDate) => {
	let data = {status: true, warningText: ""};
	if (entryDate == exitDate) {
		data.status = false;
		data.warningText = "Sorry, you cannot booking at the same day";
	} else if (new Date(entryDate) > new Date(exitDate)) {
		data.status = false;
		data.warningText = "Invalid date booking";
	} 
	return data;
};

export { getDateValidation }