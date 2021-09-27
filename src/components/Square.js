export function Square(props) {
	const state = props.state;
	let classes = "square"

	//Feature 5. When someone wins, highlight the three squares that caused the win.
	if (state) {
		classes = "win-square"
	}

	return (
		<button className={classes} onClick={props.onClick}>
			{props.value}
		</button>
	);
}
