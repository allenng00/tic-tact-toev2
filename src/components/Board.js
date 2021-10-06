import React from 'react';
import { BOARD_SIZE } from '../constants';

import { Square } from './Square'

export const Board = ({ squares, size = BOARD_SIZE, winLine, onClick }) => {

	const winStates = Array(size * size).fill(false);

	if (winLine) {
		winLine.forEach(e => {
			winStates[e] = true;
		});
	}

	return (
		<div>
			{prepareBoard(size, squares, winLine, onClick)}
		</div>
	);

}

const renderSquare = (value, index, winState, onClick) => {
	return (
		<Square
			key={index}
			value={value}
			winState={winState}
			onClick={() => onClick(index)}
		/>
	);
}

// Feature 3. Rewrite Board to use two loops to make the squares instead of hard-coding them.
const prepareBoard = (size, squares, winLine, onClick) => {
	let s = size * size
	let rows = []
	for (let i = 0; i < s; i += size) {
		const row = [...Array(size).keys()].map(val => val + i);
		rows.push(
			renderRow(
				size,
				i,
				squares.slice(i, i + size),
				row.map(value => winLine?.includes(value)),
				onClick)
		)

	}

	return rows;
}

const renderRow = (size, startIndex, values, winStates, onClick) => {
	const row = [...Array(size).keys()]

	return <div key={startIndex} className="board-row">
		{row.map(index => (
			renderSquare(
				values[index],
				index + startIndex,
				winStates[index],
				onClick)))}
	</div>
}	