import React from 'react';

import { Square } from './Square'

export const BOARD_SIZE = 3
export const Board = (props) => {

	const line = props.winLine;
	const winStates = Array(BOARD_SIZE * BOARD_SIZE).fill(false);

	if (line) {
		line.forEach(e => {
			winStates[e] = true;
		});
	}

	const renderSquare = (i) => {
		return (
			<Square
				key={i}
				value={props.squares[i]}
				state={winStates[i]}
				onClick={() => props.onClick(i)}
			/>
		);
	}

	// Feature 3. Rewrite Board to use two loops to make the squares instead of hard-coding them.
	const prepareBoard = (size) => {
		let s = size * size
		let rows = [], row = []
		for (let i = 0; i < s; i += size) {
			row = Array.from(Array(size), (x, index) => i + index);

			rows.push(
				<div key={i} className="board-row">
					{row.map(x => (renderSquare(x)))}
				</div>
			)

		}

		return rows;
	}

	return (
		<div>
			{prepareBoard(BOARD_SIZE)}
		</div>
	);

}