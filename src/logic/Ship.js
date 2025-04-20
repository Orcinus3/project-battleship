export const Ship = function (length) {
	let nHits = 0;

	function hit() {
		nHits++;
	}

	function isSunk() {
		if (nHits >= length) {
			return true;
		}
		return false;
	}

	return { hit, isSunk };
};
