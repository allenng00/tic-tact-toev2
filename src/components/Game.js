import React, { useState } from 'react';
import { Board } from './Board'
import { Settings } from './Settings';
import { calculateWinner2 } from '../features/winnerCalculate';
import { BOARD_SIZE } from '../constants';
import '../index.css';

const Game = () => {

	const [boardSize, setBoardSize] = useState(BOARD_SIZE)
	const [history, setHistory] = useState([
		{
			squares: Array(boardSize * boardSize).fill(null),
			lastPosition: [-1, -1],
			lastChar: ''
		}
	])

	const [stepNumber, setStepNumber] = useState(0)
	const [xIsNext, setXIsNext] = useState(true)
	const [moveSelecting, setMoveSelecting] = useState(0)
	const [reverseHistory, setReverseHistory] = useState(false)
	const [enableClick, setEnableClick] = useState(true)

	const handleClick = (i) => {
		const currentHistory = history.slice(0, stepNumber + 1);
		const current = currentHistory[currentHistory.length - 1];
		const squares = current.squares.slice();
		const currentPosition = [i % BOARD_SIZE, Math.floor(i / BOARD_SIZE)];

		if (squares[i]) {
			return;
		}

		squares[i] = xIsNext ? "X" : "O";
		// const state = calculateWinner2(squares, BOARD_SIZE, history.length - 1, currentPosition).state
		// if (state) {
		// 	return;
		// }
		setHistory(
			history.concat([
				{
					squares: squares,
					lastPosition: currentPosition,
					lastChar: squares[i]
				}
			])
		)
		setStepNumber(currentHistory.length)
		setXIsNext(!xIsNext)
		setMoveSelecting(currentHistory.length)

	}
	// Handle button click
	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
		setMoveSelecting(step)
	}

	const isSelected = (move) => {
		return move === moveSelecting
	}
	const changeHistoryMode = () => {
		setReverseHistory(!reverseHistory)
	}

	const replay = (size) => {
		setHistory([
			{
				squares: Array(size * size).fill(null),
				lastPosition: [-1, -1],
				lastChar: ''
			}
		])

		setStepNumber(0)
		setXIsNext(true)
		setMoveSelecting(0)
		setReverseHistory(false)
		setEnableClick(true)
	}

	const changeBoardSize = (data) => {
		const size = parseInt(data);
		setBoardSize(size);
		replay(size)
	};

	const step = stepNumber
	const current = history[step];
	const winner = calculateWinner2(current.squares, boardSize, step - 1, current.lastPosition);
	const reverse = reverseHistory;

	const stepInfor = 'Current move: ' + moveSelecting;
	let status;
	// console.log(winner.state)
	switch (winner.state) {
		case "win":
			status = "Winner: " + current.squares[winner.line[0]];
			break;
		// Feature 6. When no one wins, display a message about the result being a draw.
		case "draw":
			status = "We have a draw game"
			break;
		case null:
			status = "Next player: " + (xIsNext ? "X" : "O");
			break;
		default:

			break;
	}

	let moves = history.map((h, move) => {
		// Feature 1. Display the location for each move in the format(col, row) in the move history list.
		const desc = move ?
			`Go to move #${move}: ${h.lastChar} at (${h.lastPosition[0]}, ${h.lastPosition[1]})` :
			'Go to game start';

		return (
			<li key={move} >
				{/* Feature 2. Bold the currently selected item in the move list. */}
				<button
					className={isSelected(move) ? 'selected' : 'unselected'}
					onClick={() => jumpTo(move)}>
					{desc}
				</button>
			</li>
		);
	});

	if (reverse) {
		moves = moves.reverse();
	}

	return (
		<div className="game">
			<div className="game-settings">
				<h1 className="game-settings__title">Settings</h1>
				<Settings className="game-settings__detail"
					onToggle={changeHistoryMode}
					onValueChange={changeBoardSize} />
			</div>

			<div className="game-play">

				<div className="game-info">
					<h1>Game Play</h1>
					<ol className="game-info__status">{status}</ol>
					<ol>{stepInfor}</ol>
					<ol>{moves}</ol>
				</div>

				<div className="game-board">
					<Board
						size={boardSize}
						squares={current.squares}
						onClick={i => handleClick(i)}
						winLine={winner.line}
					/>
				</div>
			</div>

		</div>
	);
}

export default Game;