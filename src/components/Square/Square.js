import './Square.css'

export const Square = ({ value, winState, onClick }) => {
	//Feature 5. When someone wins, highlight the three squares that caused the win.
	return (
		<button className={winState ? "win-square" : "square"} onClick={onClick}>
			{value}
		</button>
	);
}
