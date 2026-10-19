// Game control react components

import React from 'react';

interface GameControlProps {
	onHit: () => void;
	onStand: () => void;
	isDisabled: boolean;
	onRestart: () => void;
	// looked up how to deal with disabling buttons
	// https://ej2.syncfusion.com/react/documentation/button/how-to/set-the-disabled-state#:~:text=Button%20component%20can%20be%20enabled,demonstrates%20Button%20in%20disabled%20state.
}

// buttons
const GameControlComponents: React.FC<GameControlProps> = ({ onHit, onStand, isDisabled, onRestart }) => {
	console.log("GameControlProps:", { onHit, onStand});
	return (
		<div>
			<button onClick={onHit} disabled={isDisabled}>Hit</button>
	  		<button onClick={onStand} disabled={isDisabled}>Stand</button>
	  		<button onClick={onRestart}>Restart</button>
	  	</div>
	);
};

export default GameControlComponents;
