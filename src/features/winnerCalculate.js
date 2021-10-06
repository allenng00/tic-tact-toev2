

const isInBoard = (size, position) => {
	return 0 <= position && position < size * size;
}

const validateLine = (size, line) => {
	return line.every(ele => isInBoard(size, ele) === true)
}

const isWinLine = (line) => {

	if (line) {
		return line?.every(ele => ele === line[0]);
	}
	return false;
}
/**
 * Check if a line is win line
 * @param {values of line} values 
 * @param {line Size} size 
 * @param {line} line 
 * @returns 
 */
const CheckWinLine = (values, size, line) => {
	if (validateLine(size, line)) {
		const newLine = line.map(ele => values[ele]);

		return isWinLine(newLine) ? line : false;
	}
	return false;
}
/**
 * Convert column, row index to 1D array index
 * @param {size of Board} size 
 * @param {*} col 
 * @param {*} row 
 * @returns 
 */
const to1DIndex = (size, col, row) => {
	if (col < 0 || row < 0 || row >= size || col >= size)
		return -1;
	const result = col + row * size;
	return result;
}
/**
 * Calculate win state of game
 * @param {value of squares} squares 
 * @param {size of Board} size 
 * @param {current step} step 
 * @returns 
 */
export const calculateWinner = (squares, size, step) => {

	if (step === 0) {
		return { state: null };
	}

	let line1, line2, line3, line4 = [];

	for (let index = 0; index < size * size; index++) {
		const col = index % size;
		const row = Math.floor(index / size);

		if (squares[index]) {
			line1 = [
				index,
				to1DIndex(size, col + 1, row),
				to1DIndex(size, col + 2, row),
				to1DIndex(size, col + 3, row),
				to1DIndex(size, col + 4, row),
			]
			line2 = [
				index,
				to1DIndex(size, col, row + 1),
				to1DIndex(size, col, row + 2),
				to1DIndex(size, col, row + 3),
				to1DIndex(size, col, row + 4),
			]
			line3 = [
				index,
				to1DIndex(size, col + 1, row + 1),
				to1DIndex(size, col + 2, row + 2),
				to1DIndex(size, col + 3, row + 3),
				to1DIndex(size, col + 4, row + 4),
			]
			line4 = [
				index,
				to1DIndex(size, col - 1, row + 1),
				to1DIndex(size, col - 2, row + 2),
				to1DIndex(size, col - 3, row + 3),
				to1DIndex(size, col - 4, row + 4),
			]
			let lines = [line1, line2, line3, line4]

			for (let i = 0; i < 4; i++) {
				const checkResult = CheckWinLine(squares, size, lines[i]);

				if (checkResult !== false) {
					return { state: "win", line: checkResult }
				}
			}
		}
	}

	if (step === size * size) {
		return { state: "draw" }
	}

	return { state: null };
}
