"use strict";
// card react components
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CardComponents = ({ card }) => {
    return (<div className="card">
			{card.displayCardValue}
	    </div>);
};
exports.default = CardComponents;
