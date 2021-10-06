import React from 'react';
import SizeDropdown from './SizeDropdown';
export const Settings = ({ onToggle, onValueChange }) => {
	return (
		<>
			<div className="setting">
				<div>Reverse History</div>

				<label className="switch">
					<input type="checkbox" value={false} onChange={onToggle} />
					<div className="slider"></div>
				</label>


			</div>
			<div className="setting">

				<div>Select Board size</div>
				<SizeDropdown onValueChange={onValueChange} />
			</div>
		</>

	)
}