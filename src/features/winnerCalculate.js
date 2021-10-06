import { winLineLength } from "../constants";


const winRanges = [
	// Center point is the middle of line
	{
		row: [0, 0, 0],
		col: [-1, 0, 1]
	},
	{
		row: [-1, 0, 1],
		col: [0, 0, 0]
	},
	{
		row: [-1, 0, 1],
		col: [1, 0, -1]
	},
	{
		row: [1, 0, -1],
		col: [1, 0, -1]
	},
	// Center point will be the start or the end of line
	{
		row: [0, 0, 0],
		col: [-2, -1, 0]
	},
	{
		row: [0, 0, 0],
		col: [0, 1, 2]
	},
	{
		row: [-2, -1, 0],
		col: [0, 0, 0]
	},
	{
		row: [0, 1, 2],
		col: [0, 0, 0]
	},
	{
		row: [0, 1, 2],
		col: [0, 1, 2]
	},
	{
		row: [-2, -1, 0],
		col: [-2, -1, 0]
	},
	{
		row: [0, -1, -2],
		col: [0, +1, +2]
	},
	{
		row: [0, +1, +2],
		col: [0, -1, -2]
	},
]


const isInBoard = (size, position) => {
	return 0 <= position && position < size * size;
}

const validateLine = (size, line) => {
	return line.every(ele => isInBoard(size, ele) === true)
}

const isWinLine = (line) => {
	if (line) {

		return line.every(ele => ele === line[0])
	}
	return false;
}

const toIndex = (size, col, row) => {
	if (col < 0 || row < 0 || row >= size || col >= size)
		return -1;
	const result = col + row * size;
	return result;
}

export const calculateWinner2 = (squares, size, step, lastPositions) => {

	if (step === 0 || !lastPositions) {
		return { state: null };
	}

	const line = [...Array(winLineLength).keys()]
	let winLine = [], newLine = [];
	let result = {}

	winRanges.forEach((range) => {
		winLine = line.map(index =>
			toIndex(
				size,
				lastPositions[0] + range.col[index],
				lastPositions[1] + range.row[index]
			))

		if (validateLine(size, winLine)) {
			newLine = winLine.map(index => squares[index])

			if (isWinLine(newLine)) {
				result = { state: "win", line: winLine };
			}
		}
	});

	if (result !== {}) {
		return result
	}

	// Draw case
	if (step === size * size) {
		return { state: "draw" }
	}

	return { state: null };
}
