// function for generate array which have specific range and depend on start idx
// range: range of generated array
// start: start index of generated array
// len: maximum number this array can generate
const getArrayWithRange = (range, start, len) => {
	if (len <= range) {
		return Array.from({ length: len }, (_, i) => i + 1);
	} else if (len - start + 1 <= range) {
		return Array.from({ length: range }, (_, i) => i + len - range + 1);
	} else {
		return Array.from(
			{ length: Math.min(range, len - start + 1) },
			(_, i) => i + start
		);
	}
};

export { getArrayWithRange };
