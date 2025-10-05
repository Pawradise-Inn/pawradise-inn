const getDateValidation = (entryDate, exitDate) => {
	let data = {status: true, warningText: ""};
	if (entryDate === exitDate) {
		data.status = false;
		data.warningText = "Entry and exit date cannot be the same.";
	} if (new Date(entryDate) > new Date(exitDate)) {
		data.status = false;
		data.warningText = "Entry date must be earlier than exit date.";
	} 
	return data;
};

export { getDateValidation }