import React from 'react';

export const Settings = (props) => {
	return (

		<div className="settings">
			<div>Reverse History</div>

			<label className="switch">
				<input type="checkbox" value={false} onChange={props.onChange} />
				<div className="slider"></div>
			</label>
		</div>
	)
}