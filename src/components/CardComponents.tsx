// card react components

import React from 'react';
import { Card } from '../Deck';

// handle the card components for cards in the deck, and game.
interface CardDisplayProps {
	card: Card;
}

const CardComponents: React.FC<CardDisplayProps> = ({ card }) => {
	return (
		<div className = "card">
			{card.displayCardValue}
	    </div>
	);
};

export default CardComponents;
