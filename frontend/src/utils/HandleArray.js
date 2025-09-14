// function for generate array which have specific range [1, len] and depend on middle idx
// @param
// range: range of generated array
// middle: middle index of generated array
// len: maximum number this array can generate
const getArrayWithRangeWithMid = (range, middle, len) => {
	if (!middle || !len) return [] ;
	if (len <= range) {
		return Array.from({ length: len }, (_, i) => i + 1);
	} else if (len - middle + 1 <= Math.floor(range / 2)) {
		return Array.from({ length: range }, (_, i) => i + len - range + 1);
	} else {
		return Array.from(
			{ length: range },
			(_, i) => i + Math.max(1, middle - Math.floor(range / 2))
		);
	}
};

export { getArrayWithRangeWithMid };
