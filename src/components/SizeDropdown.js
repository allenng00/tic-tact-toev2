import React, { useState } from 'react';
import { SIZE_RANGE } from '../constants';

const SizeDropdown = ({ onValueChange }) => {

	const onChange = (event) => {
		const data = event.target.value;
		setValue(data)
		onValueChange(data);
	};
	const { start, end } = SIZE_RANGE;

	const range = [...Array(end - start + 1).keys()].map(ele => ele + start)
	const [value, setValue] = useState(range[0]);

	return (
		<div className="dropdown">

			<select value={value} className="board-sizes" onChange={onChange}>
				{range.map(ele => (
					<option key={ele} value={ele}>{ele}x{ele}</option>

				))}
			</select>

		</div>
	);
};

export default SizeDropdown;
