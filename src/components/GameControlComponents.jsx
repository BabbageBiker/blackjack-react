"use strict";
// Game control react components
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// buttons
const GameControlComponents = ({ onHit, onStand, isDisabled, onRestart }) => {
    console.log("GameControlProps:", { onHit, onStand });
    return (<div>
			<button onClick={onHit} disabled={isDisabled}>Hit</button>
	  		<button onClick={onStand} disabled={isDisabled}>Stand</button>
	  		<button onClick={onRestart}>Restart</button>
	  	</div>);
};
exports.default = GameControlComponents;
