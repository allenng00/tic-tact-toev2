import React from 'react';
import { BOARD_SIZE } from '../constants';
import { Square } from './Square'
import './Board.css'
export const Board = ({ squares, size = BOARD_SIZE, winLine, onClick }) => {

	return (
		<div>
			{prepareBoard(size, squares, winLine, onClick)}
		</div>
	);

}

/**
 * Render Square
 * @param {value of square} value 
 * @param {index of square} index 
 * @param {state of square} winState 
 * @param {onClickHandler function} onClick 
 * @returns A square
 */
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

/**
 * Render Board
 * @param {size of Board} size 
 * @param {values of Board} squares 
 * @param {Current Win line} winLine 
 * @param {onClick function} onClick 
 * @returns 
 */
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

/**
 * Render Row
 * @param {size of Row} size 
 * @param {start index} startIndex 
 * @param {values of Row} values 
 * @param {stated of Row} winStates 
 * @param {onClick function} onClick 
 * @returns 
 */
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